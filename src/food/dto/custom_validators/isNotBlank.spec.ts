import { ValidationError, validate } from "class-validator";
import { CreateFoodDto } from "../create-food.dto";

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}

describe('isNotBlank validator', () => {
    it('should accept valid data', async () => {
        const data = new CreateFoodDto();

        data.description = 'Lorem Ipsum';

        const errors = await validate(data);

        expect(stringified(errors)).not.toContain(`String mustn't be blank (add at least 1 non-whitespace character)`);
    });

    it('should reject if description is blank', async () => {
        const data = new CreateFoodDto();

        data.description = '   ';

        const errors = await validate(data);

        expect(stringified(errors)).toContain(`String mustn't be blank (add at least 1 non-whitespace character)`);
    });
});