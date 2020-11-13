import { IsInt, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Enrollment from "./Enrollment";

@Entity()
export default class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2, 50)
  name: string;

  @Column()
  @IsInt()
  period: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
