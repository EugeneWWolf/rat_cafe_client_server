import { ValidationError, validate } from "class-validator";
import { CreateCustomerDto } from "../create-customer.dto";

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}

describe('isNotBlank validator', () => {
    it('should accept valid data', async () => {
        const data = new CreateCustomerDto();

        data.first_name = 'Lorem Ipsum';
        data.last_name = 'o';

        const errors = await validate(data);

        expect(stringified(errors)).toStrictEqual("[]");
    });

    it('should reject if first name is blank', async () => {
        const data = new CreateCustomerDto();

        data.first_name = '   ';
        data.last_name = 'a';

        const errors = await validate(data);

        expect(stringified(errors)).toContain(`Customer's first name mustn't be blank (add at least 1 non-whitespace character)`);
    });

    it('should reject if last name is blank', async () => {
        const data = new CreateCustomerDto();

        data.first_name = 'a';
        data.last_name = '  ';

        const errors = await validate(data);

        expect(stringified(errors)).toContain(`Customer's last name mustn't be blank (add at least 1 non-whitespace character)`);
    });
});