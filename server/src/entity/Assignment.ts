import { IsInt, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Lesson from "./Lesson";
import User from "./User";

@Entity()
export default class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.assignments)
  user: User

  @Column()
  lessonId: number;

  @ManyToOne(() => Lesson, lesson => lesson.assignments)
  lesson: Lesson
}
