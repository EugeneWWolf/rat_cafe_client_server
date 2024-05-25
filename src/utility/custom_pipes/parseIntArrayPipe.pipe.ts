import { Injectable, PipeTransform, BadRequestException, Logger, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
  isOptional: boolean = false;

  constructor(isOptional?: boolean) {
    if (isOptional) {
      this.isOptional = isOptional;
    }
  }

  transform(value: string, metadata: ArgumentMetadata): number[] {
    if (!value) {
      if (this.isOptional) {
        return undefined;
      }

      Logger.error(`Error in ParseIntArrayPipe`);
      throw new BadRequestException(`Validation failed in ${metadata.data} parameter: string with numbers divided by commas is expected`);
    }

    const values = value.split(',').map(item => {
      return parseInt(item.trim(), 10);
    });

    if (isNaN(values[values.length - 1])) {
      Logger.error(`Error in ParseIntArrayPipe`);
      throw new BadRequestException(`Validation failed in ${metadata.data} parameter: unable to get numeric array of indexes`);
    }

    return values;
  }
}