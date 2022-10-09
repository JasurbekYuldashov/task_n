import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerSaveDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @MinLength(9)
  @ApiProperty({ minimum: 9, maximum: 12, type: "string" })
  phone_number: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  inviteUserId: number;
}
