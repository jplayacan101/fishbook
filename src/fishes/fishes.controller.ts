import { Controller, Get, Post, Param, Body, Put, Delete, Query, Logger } from '@nestjs/common';
import { FishesService } from './fishes.service';
import { CreateFishDto } from './dto/create-fish.dto';
import { UpdateFishDto } from './dto/update-fish.dto';
import { Fish } from './schemas/fish.schema';

@Controller('fishes')
export class FishesController {
  constructor(private readonly fishesService: FishesService) {}

  @Post()
  create(@Body() createFishDto: CreateFishDto | CreateFishDto[]): Promise<Fish | Fish[]> {
    if (Array.isArray(createFishDto)) {
      return this.fishesService.createMany(createFishDto);
    } else {
      return this.fishesService.create(createFishDto);
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Fish> {
    return this.fishesService.findOneById(id);
  }

  @Get()
  findAll(): Promise<Fish[]> {
    return this.fishesService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof Fish, any>): Promise<Fish[]> {
    return this.fishesService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() updateFishDto: UpdateFishDto): Promise<Fish> {
    return this.fishesService.updateOneById(id, updateFishDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof Fish, any>,
    @Body() updateFishDto: UpdateFishDto,
  ): Promise<Fish[]> {
    return this.fishesService.updateManyByProperties(query, updateFishDto);
  }

  @Delete('id/:id')
  removeOne(@Param('id') id: string): Promise<Fish> {
    return this.fishesService.removeOneById(id);
  }

  @Delete('properties')
  removeManyByProperties(
    @Query() query: Record<keyof Fish, any>,
  ): Promise<Fish[]> {
    return this.fishesService.removeManyByProperties(query);
  }
}
