import { IsNotEmpty } from "class-validator";
import { FoodCategory } from "../entities/food.entity";

export class CreateFoodDto {
    @IsNotEmpty({message: "Food name can't be empty"})
    name: string;

    @IsNotEmpty({message: "Food category (type) can't be empty"})
    type: FoodCategory;

    @IsNotEmpty({message: "Food price can't be empty"})
    price: number;

    description?: string;
}