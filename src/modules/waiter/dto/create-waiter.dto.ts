import { IsNotEmpty, IsString } from "class-validator";
import { IsNotBlank } from "src/utility/class_validator/custom_validators/isNotBlank";

export class CreateWaiterDto {
    @IsNotEmpty({message: "Waiter's first name can't be empty"})
    @IsString({message: "Waiter's first name must be a string"})
    @IsNotBlank(`Check whether waiter's first name contains only whitespaces`, {message: "Waiter's first name mustn't be blank (add at least 1 non-whitespace character)"})
    first_name: string;

    @IsNotEmpty({message: "Waiter's last name can't be empty"})
    @IsString({message: "Waiter's last name must be a string"})
    @IsNotBlank(`Check whether waiter's last name contains only whitespaces`, {message: "Waiter's last name mustn't be blank (add at least 1 non-whitespace character)"})
    last_name: string;
}