import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { IsNotBlank } from "./isNotBlank";

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}

class MyTestDto {
    @IsNotBlank(`Check whether test dto's name contains only whitespaces`, {message: "Test dto's name mustn't be blank (add at least 1 non-whitespace character)"})
    name: string;
}

describe('isNotBlank validator', () => {
    it('should accept valid (non-blank) data', async () => {
        const testJson = { name: 'abc' };
        const myTestDtoObject = plainToInstance(MyTestDto, testJson);

        const errors = await validate(myTestDtoObject);

        expect(stringified(errors)).toStrictEqual('[]');
    });

    it('should reject invalid (blank) data', async () => {
        const testJson = { name: ' ' };
        const myTestDtoObject = plainToInstance(MyTestDto, testJson);

        const errors = await validate(myTestDtoObject);

        expect(stringified(errors)).toContain("Test dto's name mustn't be blank (add at least 1 non-whitespace character)");
    });
});