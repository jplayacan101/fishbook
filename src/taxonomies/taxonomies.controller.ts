import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TaxonomiesService } from './taxonomies.service';
import { Taxonomy } from './schemas/taxonomy.schema';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';



@Controller('taxonomies')
export class TaxonomiesController {
  constructor(private readonly taxonomiesService: TaxonomiesService) {}

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Taxonomy> {
    return this.taxonomiesService.findOneById(id);
  }

  @Get()
  findAll(): Promise<Taxonomy[]> {
    return this.taxonomiesService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof Taxonomy, any>): Promise<Taxonomy[]> {
    return this.taxonomiesService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() udateTaxonomyDto: UpdateTaxonomyDto): Promise<Taxonomy> {
    return this.taxonomiesService.updateOneById(id, udateTaxonomyDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof Taxonomy, any>,
    @Body() updateTaxonomyDto: UpdateTaxonomyDto,
  ): Promise<Taxonomy[]> {
    return this.taxonomiesService.updateManyByProperties(query, updateTaxonomyDto);
  }

}

