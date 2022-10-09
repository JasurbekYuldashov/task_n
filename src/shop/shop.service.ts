import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShopSchema } from "../schema/shop.schema";
import { ShopSaveDto } from "../dto/shop.save.dto";
import { ShopUpdateDto } from "../dto/shop.update.dto";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopSchema)
    private schemaRepository: Repository<ShopSchema>
  ) {
  }

  async findAll(): Promise<ShopSchema[]> {
    return this.schemaRepository.find().catch(e => {
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


  async save(data: ShopSaveDto) {
    return this.schemaRepository.save(data).catch(e => {
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

  async update(id: number, data: ShopUpdateDto) {
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


  async getOne(id: number) {
    const data = await this.schemaRepository.findOne({ where: { id } }).catch(e => {
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
