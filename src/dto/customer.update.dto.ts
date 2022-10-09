import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerUpdateDto {
  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  @MaxLength(12)
  @MinLength(9)
  phone_number: string;
}
