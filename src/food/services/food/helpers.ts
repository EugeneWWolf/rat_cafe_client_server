import { CreateFoodDto } from "src/food/dto/create-food.dto";
import { Food, FoodCategory } from "src/food/entities/food.entity";

export function fakeFoodHelper(): CreateFoodDto {
    const food = new Food();
    
    food.name = 'Latte';
    food.price = 999;
    food.type = FoodCategory.COFFEE;
    food.description = 'Cool coffee';

    return food;
}