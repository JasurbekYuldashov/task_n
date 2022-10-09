import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Level } from "./shop.save.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ShopUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [Level], required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => Level)
  levels: Level[];
}
