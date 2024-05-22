import { Waiter } from "src/modules/waiter/entities/waiter.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @ManyToMany(() => Waiter, (waiter) => waiter.rats)
    waiters: Waiter[];
}