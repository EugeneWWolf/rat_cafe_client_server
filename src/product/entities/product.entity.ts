import { BeforeInsert, Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ProductCategory {
    COFFEE = "coffee",
    SALAD = "salad",
    SOUP = "soup",
    DESSERT = "dessert"
}

@Entity()
@Check('"price" >= 100')
export class Product {

    @BeforeInsert()
    productCategoryToLowerCase() {
        this.type = this.type.toLowerCase() as ProductCategory;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: ProductCategory
    })
    type: ProductCategory;

    @Column()
    price: number;

    @Column({
        nullable: true
    })
    description: string;
}