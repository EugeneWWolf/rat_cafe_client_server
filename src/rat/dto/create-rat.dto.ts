import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "./custom_validators/isNotBlank";

export class CreateRatDto {
    @IsNotEmpty({message: "Rat name can't be empty"})
    @IsString({message: "Rat name must be a string"})
    @IsNotBlank('Check whether rat name contains only whitespaces', {message: "Rat name mustn't be blank (add at least 1 non-whitespace character)"})
    name: string;

    @IsOptional()
    @IsNotEmpty({message: "Rat description can't be empty"})
    @IsNotBlank('Check whether rat description contains only whitespaces', {message: "Rat description mustn't be blank (add at least 1 non-whitespace character)"})
    description: string;
}