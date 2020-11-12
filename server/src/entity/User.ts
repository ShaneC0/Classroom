import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {IsEmail, Length, MinLength} from "class-validator"
import Class from "./Class";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column()
    @MinLength(8)
    password: string;
}