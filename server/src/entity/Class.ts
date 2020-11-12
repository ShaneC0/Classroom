import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    period: number;
}

export default Class;