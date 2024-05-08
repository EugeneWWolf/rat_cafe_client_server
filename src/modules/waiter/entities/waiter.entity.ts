import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Waiter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;
}