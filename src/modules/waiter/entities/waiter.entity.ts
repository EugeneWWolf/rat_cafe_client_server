import { Rat } from "src/modules/rat/entities/rat.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Waiter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @ManyToMany(() => Rat, (rat) => rat.waiters, {cascade: true})
    @JoinTable({name: 'Bound_rats'})
    rats: Rat[];
}