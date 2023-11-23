import { Controller, Get, Post, Body, Param, Put, Delete, Query, Logger } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { Habitat } from './schemas/habitat.schema';
import { UpdateHabitatDto } from './dto/update-habitat.dto';

@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) {}

  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto | CreateHabitatDto[]): Promise<Habitat | Habitat[]> {
    if (Array.isArray(createHabitatDto)) {
      return this.habitatsService.createMany(createHabitatDto);
    } else {
      return this.habitatsService.create(createHabitatDto);
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Habitat> {
    return this.habitatsService.findOneById(id);
  }

  @Get()
  findAll(): Promise<Habitat[]> {
    return this.habitatsService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof Habitat, any>): Promise<Habitat[]> {
    return this.habitatsService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto): Promise<Habitat> {
    return this.habitatsService.updateOneById(id, updateHabitatDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof Habitat, any>,
    @Body() updateHabitatDto: UpdateHabitatDto,
  ): Promise<Habitat[]> {
    return this.habitatsService.updateManyByProperties(query, updateHabitatDto);
  }


  @Delete('id/:id')
  removeOne(@Param('id') id: string): Promise<Habitat> {
    return this.habitatsService.removeOneById(id);
  }

  @Delete('properties')
  removeManyByProperties(
    @Query() query: Record<keyof Habitat, any>,
  ): Promise<Habitat[]> {
    return this.habitatsService.removeManyByProperties(query);
  }


}
