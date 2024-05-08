import { CreateProductDto } from "src/modules/product/dto/create-product.dto";
import { ProductCategory } from "src/modules/product/entities/product.entity";

export function createProductDTO(name: string, price: number, type: ProductCategory, description?: string): CreateProductDto {
    const dto = new CreateProductDto;
    dto.name = name;
    dto.price = price;
    dto.type = type;
    dto.description = description;

    return dto;
}