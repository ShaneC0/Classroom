import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {IsEmail, Length, MinLength} from "class-validator"
import Lesson from "./Lesson";

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

    @OneToMany(() => Lesson, lesson => lesson.teacher)
    lessons: Lesson[]
}