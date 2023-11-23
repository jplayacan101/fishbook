import { Body, Controller, Delete, Get, Logger, Param, Put, Query } from '@nestjs/common';
import { ConservationEffortsService } from './conservation-efforts.service';
import { ConservationEffort } from './schemas/conservation-efforts.schema';
import { UpdateConservationEffortDto } from './dto/update-conservation-effort.dto';

@Controller('conservation-efforts')
export class ConservationEffortsController {
  constructor(private readonly conservationEffortsService: ConservationEffortsService) {}

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<ConservationEffort> {
    return this.conservationEffortsService.findOneById(id);
  }

  @Get()
  findAll(): Promise<ConservationEffort[]> {
    return this.conservationEffortsService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof ConservationEffort, any>): Promise<ConservationEffort[]> {
    return this.conservationEffortsService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() updateConservationEffortDto: UpdateConservationEffortDto): Promise<ConservationEffort> {
    return this.conservationEffortsService.updateOneById(id, updateConservationEffortDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof ConservationEffort, any>,
    @Body() updateConservationEffortDto: UpdateConservationEffortDto,
  ): Promise<ConservationEffort[]> {
    return this.conservationEffortsService.updateManyByProperties(query, updateConservationEffortDto);
  }

  @Delete('id/:id')
  removeOne(@Param('id') id: string): Promise<ConservationEffort> {
    return this.conservationEffortsService.removeOneById(id);
  }

  @Delete('properties')
  removeManyByProperties(
    @Query() query: Record<keyof ConservationEffort, any>,
  ): Promise<ConservationEffort[]> {
    return this.conservationEffortsService.removeManyByProperties(query);
  }

}
