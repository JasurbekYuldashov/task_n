import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerSchema } from "../schema/customer.schema";
import { CustomerSaveDto } from "../dto/customer.save.dto";
import { CustomerUpdateDto } from "../dto/customer.update.dto";
import { ProductBuyDto } from "../dto/product.buy.dto";
import { ShopService } from "../shop/shop.service";
import { Level } from "../dto/shop.save.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerSchema)
    private schemaRepository: Repository<CustomerSchema>,
    private readonly shopService: ShopService
  ) {
  }

  async findAll(): Promise<CustomerSchema[]> {
    return this.schemaRepository.find({ relations: ["inviteUserId"] }).catch(e => {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Something went wrong!",
          error: "Bad request"
        },
        HttpStatus.BAD_REQUEST
      );
    });
  }


  async save(data: CustomerSaveDto) {
    const user = data.inviteUserId && await this.schemaRepository.findOne({ where: { id: data.inviteUserId } });
    delete data.inviteUserId;
    return this.schemaRepository.save({
      name: data.name,
      inviteUserId: user,
      phone_number: data.phone_number
    }).catch(e => {
      if (e.code == "23505") {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Bad request",
            message: e.detail
          },
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad request",
          message: "Please send correct fields!"
        },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  async update(id: number, data: CustomerUpdateDto) {
    return this.schemaRepository.update(id, data).catch(e => {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad request",
          message: "Please send correct fields!"
        },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  async buy(id: number, data: ProductBuyDto) {
    try {
      const customers = [];
      const shop = await this.shopService.getOne(data.shopId);
      if (!shop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: "Not found",
            message: "Shop not found!"
          },
          HttpStatus.NOT_FOUND
        );
      }
      const levels: Level[] = shop.levels;
      const getPercentage = (index) => {
        const item = levels.find(e => e.index === index);
        return item && item.percentage;
      };
      const getFunc = async (customerId) => {
        const customer = await this.getOne(customerId);
        if (customer.inviteUserId && customer.inviteUserId.id) {
          const index = customers.length + 1;
          const percentage = getPercentage(index);
          if (percentage) {
            customer.inviteUserId.cashback += data.price * percentage / 100;
            await this.schemaRepository.update({ id: customer.inviteUserId.id }, customer.inviteUserId);
          }
          customers.push(customer.inviteUserId);
          await getFunc(customer.inviteUserId.id);
        }
      };

      await getFunc(id);
      return customers;
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad Request",
          message: "Please check fields!"
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }


  async getOne(id: number) {
    const data = await this.schemaRepository.findOne({ where: { id }, relations: ["inviteUserId"] }).catch(() => {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad request",
          message: "Please send correct fields!"
        },
        HttpStatus.BAD_REQUEST
      );
    });
    if (!data) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: "Not found",
          message: "Item not found!"
        },
        HttpStatus.NOT_FOUND
      );
    }
    return data;
  }

  async delete(id: number) {
    return this.schemaRepository.delete({ id }).catch(e => {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad request",
          message: "Please send correct fields!"
        },
        HttpStatus.BAD_REQUEST
      );
    });
  }
}
