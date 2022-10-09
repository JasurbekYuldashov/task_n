import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("shop")
export class ShopSchema {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ nullable: false })
  @Column()
  name: string;

  @ApiProperty({ type: ()=>[Level] })
  @Column("jsonb", { nullable: true })
  levels: Level[];

  @ApiProperty()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}

class Level {
  @ApiProperty()
  index: number;

  @ApiProperty()
  percentage: number;
}
