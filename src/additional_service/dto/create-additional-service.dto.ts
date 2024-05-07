import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/class_validator/custom_validators/isNotBlank";

export class CreateAdditionalServiceDto {
    @IsNotEmpty({message: "Additional service's name can't be empty"})
    @IsString({message: "Additional service's name must be a string"})
    @IsNotBlank(`Check whether additional service's name contains only whitespaces`, {message: "Additional service's name mustn't be blank (add at least 1 non-whitespace character)"})
    name: string;

    @IsNotEmpty({message: "Additional service's price can't be empty"})
    @IsNumberString({no_symbols: true}, {message: "Additional service's price must be a numeric string"})
    price: number;
    
    @IsOptional()
    @IsString({message: "Additional service's description must be a string"})
    @IsNotBlank(`Check whether additional service's description contains only whitespaces`, {message: "Additional service's description mustn't be blank (add at least 1 non-whitespace character)"})
    description?: string;
}