import { FoodCategory } from "../entities/food.entity";

export class CreateFoodDto {
    name: string;
    type: FoodCategory;
    price: number;
    description?: string;
}