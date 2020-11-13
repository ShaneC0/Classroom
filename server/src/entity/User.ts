import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {IsEmail, Length, MinLength} from "class-validator"
import Lesson from "./Lesson";
import Enrollment from "./Enrollment";

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

    @OneToMany(() => Enrollment, enrollment => enrollment.student)
    enrollments: Enrollment[]
}