import { IsInt, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import Lesson from "./Lesson";
import User from "./User";

@Entity()
export default class Enrollment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column()
    lessonId: number;

    @ManyToOne(() => User, user => user.enrollments)
    student: User

    @ManyToOne(() => Lesson, lesson => lesson.enrollments)
    lesson: Lesson
}
