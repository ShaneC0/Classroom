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

@Entity()
export default class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pointValue: string;

  @Column()
  lessonId: number;

  @ManyToOne(() => Lesson, lesson => lesson.assignments)
  lesson: Lesson
}
