import { Injectable, PipeTransform, BadRequestException, Logger, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
  private readonly logger = new Logger(ParseIntArrayPipe.name);

  isOptional: boolean = false;

  constructor(isOptional?: boolean) {
    if (typeof isOptional !== 'undefined' && isOptional !== null) {
      this.isOptional = isOptional;
    }
  }

  transform(value: string, metadata: ArgumentMetadata): number[] {
    if (!value) {
      if (this.isOptional) {
        return null;
      }

      this.logger.error(`Validation failed in ${metadata.data} parameter: string with numbers divided by commas is expected`);
      
      throw new BadRequestException(`Validation failed in ${metadata.data} parameter: string with numbers divided by commas is expected`);
    }

    const values = value.split(',').map(item => {
      return parseInt(item.trim(), 10);
    });

    if (isNaN(values[values.length - 1])) {
      this.logger.error(`Validation failed in ${metadata.data} parameter: unable to get numeric array of indexes`);
      
      throw new BadRequestException(`Validation failed in ${metadata.data} parameter: unable to get numeric array of indexes`);
    }

    return values;
  }
}