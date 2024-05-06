import { PartialType } from "@nestjs/mapped-types";
import { CreateRatDto } from "./create-rat.dto";

export class UpdateRatDto extends PartialType(CreateRatDto) {}