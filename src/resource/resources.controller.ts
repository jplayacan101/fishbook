import { Controller, Get, Post, Body, Param, Put, Delete, Query, Logger } from '@nestjs/common';
import { ResourcesService} from './resources.service';
import { CreateReourceDto } from './dto/create-resource.dto';
import { Resource } from './schemas/resource.schema';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateReourceDto | CreateReourceDto[]): Promise<Resource | Resource[]> {
    if (Array.isArray(createResourceDto)) {
      return this.resourcesService.createMany(createResourceDto);
    } else {
      return this.resourcesService.create(createResourceDto);
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Resource> {
    return this.resourcesService.findOneById(id);
  }

  @Get()
  findAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof Resource, any>): Promise<Resource[]> {
    return this.resourcesService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto): Promise<Resource> {
    return this.resourcesService.updateOneById(id, updateResourceDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof Resource, any>,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<Resource[]> {
    return this.resourcesService.updateManyByProperties(query, updateResourceDto);
  }


  @Delete('id/:id')
  removeOne(@Param('id') id: string): Promise<Resource> {
    return this.resourcesService.removeOneById(id);
  }

  @Delete('properties')
  removeManyByProperties(
    @Query() query: Record<keyof Resource, any>,
  ): Promise<Resource[]> {
    return this.resourcesService.removeManyByProperties(query);
  }


}
