import {PartialType} from '@nestjs/mapped-types';
import { CreateConservationEffortDto } from "./create-conservation-effort.dto";

export class UpdateConservationEffortDto extends PartialType (CreateConservationEffortDto) {

}