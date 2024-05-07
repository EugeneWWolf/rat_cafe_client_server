import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Check('"price" >= 100')
export class AdditionalService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({
        nullable: true
    })
    description: string;
}