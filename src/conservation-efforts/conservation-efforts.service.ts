import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConservationEffort } from './schemas/conservation-efforts.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateConservationEffortDto } from './dto/create-conservation-effort.dto';
import { UpdateConservationEffortDto } from './dto/update-conservation-effort.dto';
import { Taxonomy } from 'src/taxonomies/schemas/taxonomy.schema';

@Injectable()
export class ConservationEffortsService {
    constructor(
        @InjectModel(ConservationEffort.name) private conservationEffortModel: Model<ConservationEffort>,
      ) {}
    
      async create(createHabitatDto: CreateConservationEffortDto): Promise<ConservationEffort> {
        const createdHabitat = new this.conservationEffortModel(createHabitatDto);
        return createdHabitat.save();
      }
    
      async createMany(createConservationEffortDtos: CreateConservationEffortDto[]): Promise<ConservationEffort[]> {
        const habitats = await Promise.all(
            createConservationEffortDtos.map((dto) => this.create(dto))
        );
        return habitats;
      }
    
      async findOneById(id: string): Promise<ConservationEffort> {
        return this.conservationEffortModel.findById(id).exec();
      }
    
      async findAll(): Promise<ConservationEffort[]> {
        return this.conservationEffortModel.find().exec();
      }
    
      async findManyByProperties(properties: Record<keyof ConservationEffort, any>): Promise<ConservationEffort[]> {  
        return this.conservationEffortModel.find(properties).exec();
      }
    
      async updateOneById(id: string, updateConservationEffortDto: UpdateConservationEffortDto): Promise<ConservationEffort> {
        return this.conservationEffortModel.findByIdAndUpdate(id, updateConservationEffortDto, { new: true }).exec();
      }
    
      async updateManyByProperties(originalFilter: Record<keyof ConservationEffort, any>, updateConservationEffortDto: UpdateConservationEffortDto): Promise<ConservationEffort[]> {
        const originalFilterValues = { ...originalFilter };
        const updatedFilter = { ...originalFilter, ...updateConservationEffortDto };
        const updateResult = await this.conservationEffortModel.updateMany(originalFilterValues, updateConservationEffortDto).exec();
        return this.findManyByProperties(updatedFilter);
      }
    
      async removeOneById(id: string): Promise<ConservationEffort> {
        return this.conservationEffortModel.findByIdAndDelete(id).exec();
      }
    
      async removeManyByProperties(properties: Record<keyof ConservationEffort, any>): Promise<ConservationEffort[]> {
        const documentsToRemove = await this.findManyByProperties(properties);
        const removedConservationEffort = await this.conservationEffortModel.deleteMany(properties).exec();
        if (removedConservationEffort.deletedCount > 0) {
          return documentsToRemove;
        } else {
          return [];
        }
      }
}

