import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("customer")
export class CustomerSchema {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty({ uniqueItems: true })
  phone_number: string;

  @Column({ default: 0, type: "float" })
  @ApiProperty({ type: "float" })
  cashback: number;

  @ManyToOne(type => CustomerSchema, element => element.id)
  @JoinTable({ joinColumn: { name: "customer_id_1" } })
  @ApiProperty({ description: "it related to this table's id", type: "integer" })
  inviteUserId: CustomerSchema;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  updated_at: Date;
}
