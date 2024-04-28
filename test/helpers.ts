import { CreateFoodDto } from "src/food/dto/create-food.dto";
import { FoodCategory } from "src/food/entities/food.entity";

export function createFoodDTO(name: string, price: number, type: FoodCategory, description?: string): CreateFoodDto {
    const dto = new CreateFoodDto;
    dto.name = name;
    dto.price = price;
    dto.type = type;
    dto.description = description;

    return dto;
}