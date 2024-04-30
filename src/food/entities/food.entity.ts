import { BeforeInsert, Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum FoodCategory {
    COFFEE = "coffee",
    SALAD = "salad",
    SOUP = "soup",
    DESSERT = "dessert"
}

@Entity()
@Check('"price" >= 100')
export class Food {

    @BeforeInsert()
    foodCategoryToLowerCase() {
        this.type = this.type.toLowerCase() as FoodCategory;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: FoodCategory
    })
    type: FoodCategory;

    @Column()
    price: number;

    @Column({
        nullable: true
    })
    description: string;
}