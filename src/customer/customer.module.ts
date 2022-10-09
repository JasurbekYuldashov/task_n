import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerSchema } from "../schema/customer.schema";
import { ShopService } from "../shop/shop.service";
import { ShopSchema } from "../schema/shop.schema";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSchema, ShopSchema])],
  controllers: [CustomerController],
  providers: [CustomerService, ShopService]
})
export class CustomerModule {
}
