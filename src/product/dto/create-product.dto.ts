import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "../entities/product.entity";
import { IsNotBlank } from "./custom_validators/isNotBlank";

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
    @IsNumberString({}, {message: "Product price must be a numeric string"})
    price: number;

    @IsOptional()
    @IsString({message: "Product description must be a string"})
    @IsNotBlank('Check whether product description contains only whitespaces', {message: "Product description mustn't be blank (add at least 1 non-whitespace character)"})
    description?: string;
}