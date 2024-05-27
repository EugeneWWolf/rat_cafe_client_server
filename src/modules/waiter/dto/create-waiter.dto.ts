import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    @IsNotEmpty({message: "ratIDs input string can't be empty"})
    @IsString({message: "ratIDs input should be a real string"})
    ratIDs?: number[];
}