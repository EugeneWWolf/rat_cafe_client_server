import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
  transform(value: string): number[] {
    if (!value) {
      throw new BadRequestException('Validation failed (string is expected)');
    }
    const values = value.split(',').map(item => {
      return parseInt(item.trim(), 10);
    });
    return values;
  }
}