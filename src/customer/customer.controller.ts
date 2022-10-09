import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerSaveDto } from "../dto/customer.save.dto";
import { CustomerUpdateDto } from "../dto/customer.update.dto";
import { ProductBuyDto } from "../dto/product.buy.dto";
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UpdateDeleteDto } from "../dto/update.delete.dto";
import { CustomerSchema } from "../schema/customer.schema";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  @Get("/")
  @ApiResponse({ type: [CustomerSchema], description: "endpoint for find all elements" })
  @ApiOkResponse()
  async getAll(@Query() query?: any) {
    const data = await this.customerService.findAll();
    return { data, statusCode: HttpStatus.OK };
  }

  @Post("/")
  @ApiResponse({ type: CustomerSchema, description: "endpoint for create new Shop" })
  @ApiBody({ type: () => CustomerSaveDto })
  @ApiOkResponse()
  async save(@Body() body: CustomerSaveDto) {
    return await this.customerService.save(body);
  }

  @Post("/buy-product/:id")
  @ApiResponse({ type: () => [CustomerSchema] })
  @ApiParam({ name: "id", type: "number", description: "id using for find item" })
  @ApiBody({ type: () => ProductBuyDto })
  @ApiOkResponse({ description: "this endpoint using buying products" })
  async buy(@Param("id") id: number, @Body() body: ProductBuyDto) {
    return await this.customerService.buy(id, body);
  }

  @Get("/:id")
  @ApiOkResponse()
  @ApiResponse({ type: CustomerSchema, description: "find one element by id (integer)" })
  @ApiParam({ name: "id", type: "integer" })
  async getOne(@Param("id") id: number) {
    return await this.customerService.getOne(id);
  }

  @Put("/:id")
  @ApiResponse({ type: () => UpdateDeleteDto })
  @ApiParam({ name: "id", type: "number", description: "id using for find item and update" })
  @ApiBody({ type: () => CustomerUpdateDto })
  @ApiOkResponse({ description: "this endpoint using update item" })
  async update(@Param("id") id: number, @Body() body: CustomerUpdateDto) {
    return await this.customerService.update(id, body);
  }

  @Delete("/:id")
  @ApiResponse({ type: () => UpdateDeleteDto })
  @ApiOkResponse({ description: "delete item using id" })
  @ApiParam({ name: "id", type: "number" })
  async delete(@Param("id") id: number) {
    return await this.customerService.delete(id);
  }
}
