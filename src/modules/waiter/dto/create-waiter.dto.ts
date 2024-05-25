import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { IsNotBlank } from "src/utility/class_validator/custom_validators/isNotBlank";

export class CreateWaiterDto {
    @IsNotEmpty({message: "Waiter first name can't be empty"})
    @IsString({message: "Waiter first name must be a string"})
    @IsNotBlank('Check whether waiter first name contains only whitespaces', {message: "Waiter first name mustn't be blank (add at least 1 non-whitespace character)"})
    first_name: string;

    @IsNotEmpty({message: "Waiter last name can't be empty"})
    @IsString({message: "Waiter last name must be a string"})
    @IsNotBlank('Check whether waiter last name contains only whitespaces', {message: "Waiter last name mustn't be blank (add at least 1 non-whitespace character)"})
    last_name: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    ratIDs?: number[];
}