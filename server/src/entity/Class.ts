import { IsInt, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from "./User";

@Entity()
export default class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @Length(2, 50)
    name: string;

    @Column()
    @IsInt()
    period: number;
}
