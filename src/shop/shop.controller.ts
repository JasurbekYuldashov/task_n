import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopSaveDto } from "../dto/shop.save.dto";
import { ShopUpdateDto } from "../dto/shop.update.dto";
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ShopSchema } from "../schema/shop.schema";
import { UpdateDeleteDto } from "../dto/update.delete.dto";

@Controller("shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) {
  }

  @Get("/")
  @ApiResponse({ type: [ShopSchema], description: "endpoint for find all elements" })
  @ApiOkResponse()
  async getAll(@Query() query?: any) {
    return await this.shopService.findAll();
  }

  @Post("/")
  @ApiResponse({ type: ShopSchema, description: "endpoint for create new Shop" })
  @ApiBody({ type: () => ShopSaveDto })
  @ApiOkResponse()
  async save(@Body() body: ShopSaveDto) {
    return await this.shopService.save(body);
  }

  @Get("/:id")
  @ApiOkResponse()
  @ApiResponse({ type: ShopSchema, description: "find one element by id (integer)" })
  @ApiParam({ name: "id", type: "integer" })
  async getOne(@Param("id") id: number) {
    return await this.shopService.getOne(id);
  }

  @Put("/:id")
  @ApiResponse({ type: () => UpdateDeleteDto })
  @ApiParam({ name: "id", type: "number", description: "id using for find item and update" })
  @ApiBody({ type: () => ShopUpdateDto })
  @ApiOkResponse({ description: "this endpoint using update item" })
  async update(@Param("id") id: number, @Body() body: ShopUpdateDto) {
    return await this.shopService.update(id, body);
  }

  @Delete("/:id")
  @ApiResponse({ type: () => UpdateDeleteDto })
  @ApiOkResponse({ description: "delete item using id" })
  @ApiParam({ name: "id", type: "number" })
  async delete(@Param("id") id: number) {
    return await this.shopService.delete(id);
  }

}
