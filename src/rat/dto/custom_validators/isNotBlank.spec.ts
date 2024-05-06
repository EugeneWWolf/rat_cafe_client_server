import { ValidationError, validate } from "class-validator";
import { CreateRatDto } from "../create-rat.dto";

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}

describe('isNotBlank validator', () => {
    it('should accept valid data', async () => {
        const data = new CreateRatDto();

        data.name = 'a';
        data.description = 'Lorem Ipsum';

        const errors = await validate(data);

        expect(stringified(errors)).toStrictEqual("[]");
    });

    it('should reject if description is blank', async () => {
        const data = new CreateRatDto();

        data.name = 'a';
        data.description = '   ';

        const errors = await validate(data);

        expect(stringified(errors)).toContain(`Rat description mustn't be blank (add at least 1 non-whitespace character)`);
    });

    it('should reject if rat name is blank', async () => {
        const data = new CreateRatDto();

        data.name = '   ';

        const errors = await validate(data);

        expect(stringified(errors)).toContain(`Rat name mustn't be blank (add at least 1 non-whitespace character)`);
    });
});