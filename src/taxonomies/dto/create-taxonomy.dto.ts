import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaxonomyDto {
  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  kingdom: string;

  @IsString()
  @IsNotEmpty()
  phylum: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsString()
  @IsNotEmpty()
  family: string;

  @IsString()
  @IsNotEmpty()
  genus: string;
}
