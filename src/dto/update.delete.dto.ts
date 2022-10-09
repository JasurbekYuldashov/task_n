import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeleteDto {
  @ApiProperty({ type:'array' })
  generatedMaps: number[];

  @ApiProperty({ description: "count of changed data" })
  affected: number;

  @ApiProperty({ type:'array' })
  raw: object[];
}
