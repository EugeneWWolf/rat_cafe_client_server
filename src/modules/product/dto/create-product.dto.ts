import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { IsNotBlank } from "src/utility/class_validator/custom_validators/isNotBlank";
import { ProductCategory } from "../entities/product.entity";

export class CreateProductDto {
    @IsNotEmpty({message: "Product name can't be empty"})
    @IsString({message: "Product name must be a string"})
    @IsNotBlank('Check whether product name contains only whitespaces', {message: "Product name mustn't be blank (add at least 1 non-whitespace character)"})
    name: string;

    @IsNotEmpty({message: "Product category (type) can't be empty"})
    @IsString({message: "Product type must be a string"})
    @IsNotBlank('Check whether product category contains only whitespaces', {message: "Product category mustn't be blank (add at least 1 non-whitespace character)"})
    type: ProductCategory;

    @IsNotEmpty({message: "Product price can't be empty"})
    @IsInt({message: "Product price must be an integer"})
    @Min(1, {message: "Product price must be larger than 0"})
    price: number;

    @IsOptional()
    @IsString({message: "Product description must be a string"})
    @IsNotBlank('Check whether product description contains only whitespaces', {message: "Product description mustn't be blank (add at least 1 non-whitespace character)"})
    description?: string;
}