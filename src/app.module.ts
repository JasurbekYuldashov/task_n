import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopSchema } from "./schema/shop.schema";
import { CustomerSchema } from "./schema/customer.schema";
import { ShopModule } from "./shop/shop.module";
import { CustomerModule } from "./customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "cuba",
      database: "task_n",
      entities: [ShopSchema, CustomerSchema],
      synchronize: true
    }),
    ShopModule,
    CustomerModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
