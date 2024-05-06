import { IsLowercase, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "../entities/product.entity";
import { IsNotBlank } from "./custom_validators/isNotBlank";

export class CreateProductDto {
    @IsNotEmpty({message: "Food name can't be empty"})
    @IsString()
    name: string;

    @IsNotEmpty({message: "Food category (type) can't be empty"})
    type: ProductCategory;

    @IsNotEmpty({message: "Food price can't be empty"})
    price: number;

    @IsOptional()
    @IsNotBlank('Check if string contains not only whitespaces', {message: "String mustn't be blank (add at least 1 non-whitespace character)"})
    description?: string;
}