import { IsInt, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import User from "./User";

@Entity()
export default class Lesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @Length(2, 50)
    name: string;

    @Column()
    @IsInt()
    period: number;

    @ManyToOne(() => User, user => user.teachingLessons)
    teacher: User;

    @Column()
    teacherId: number;
}
