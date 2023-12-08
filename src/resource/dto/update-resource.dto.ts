import {PartialType} from '@nestjs/mapped-types';
import { CreateReourceDto } from "./create-resource.dto";

export class UpdateResourceDto extends PartialType (CreateReourceDto) {

}