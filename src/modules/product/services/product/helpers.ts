import { CreateProductDto } from "src/modules/product/dto/create-product.dto";
import { Product, ProductCategory } from "src/modules/product/entities/product.entity";

export function fakeProductHelper(): CreateProductDto {
    const food = new Product();
    
    food.name = 'Latte';
    food.price = 999;
    food.type = ProductCategory.COFFEE;
    food.description = 'Cool coffee';

    return food;
}