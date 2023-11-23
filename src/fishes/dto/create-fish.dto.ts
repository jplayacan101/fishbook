import { isNotEmpty } from "class-validator";
import { CreateHabitatDto } from "src/habitats/dto/create-habitat.dto";
import { CreateTaxonomyDto } from "src/taxonomies/dto/create-taxonomy.dto";

export class CreateFishDto {
    commonName: string;
    synonyms: string[];
    physicalDescription: string;
    averageSize: number;
    averageWeight: number;
    location: string[];
    habitats: string[];
    eatingPatterns: string;
    picture: string;
    behavior: string;
    yearDiscovered: number;
    conservationStatus: string;
    taxonomy: Object;
    threats: string[];
    conservationEffort: Object;
  }
  