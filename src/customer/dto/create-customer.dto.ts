import { IsNotEmpty, IsString } from "class-validator";
import { IsNotBlank } from "./custom_validators/isNotBlank";

export class CreateCustomerDto {
    @IsNotEmpty({message: "Customer's first name can't be empty"})
    @IsString({message: "Customer's first name must be a string"})
    @IsNotBlank('Check whether customer first name contains only whitespaces', {message: "Customer's first name mustn't be blank (add at least 1 non-whitespace character)"})
    first_name: string;

    @IsNotEmpty({message: "Customer's last name can't be empty"})
    @IsString({message: "Customer's last name must be a string"})
    @IsNotBlank('Check whether customer last name contains only whitespaces', {message: "Customer's last name mustn't be blank (add at least 1 non-whitespace character)"})
    last_name: string;
}