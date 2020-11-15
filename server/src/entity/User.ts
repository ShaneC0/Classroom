import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {IsEmail, Length, MinLength} from "class-validator"
import Lesson from "./Lesson";
import Enrollment from "./Enrollment";
import Assignment from "./Assignment";

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

    @OneToMany(() => Assignment, assignment => assignment.user)
    assignments: Assignment[]

    @OneToMany(() => Enrollment, enrollment => enrollment.student)
    enrollments: Enrollment[]
}