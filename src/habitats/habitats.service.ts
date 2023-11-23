import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Habitat } from './schemas/habitat.schema';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class HabitatsService {
  constructor(
    @InjectModel(Habitat.name) private habitatModel: Model<Habitat>,
  ) {}

  async create(createHabitatDto: CreateHabitatDto): Promise<Habitat> {
    const createdHabitat = new this.habitatModel(createHabitatDto);
    return createdHabitat.save();
  }

  async createMany(createHabitatDtos: CreateHabitatDto[]): Promise<Habitat[]> {
    const habitats = await Promise.all(
      createHabitatDtos.map((dto) => this.create(dto))
    );
    return habitats;
  }

  async findOneById(id: string): Promise<Habitat> {
    return this.habitatModel.findById(id).exec();
  }

  async findAll(): Promise<Habitat[]> {
    return this.habitatModel.find().exec();
  }

  async findManyByProperties(properties: Record<keyof Habitat, any>): Promise<Habitat[]> {  
    return this.habitatModel.find(properties).exec();
  }
  

  async updateOneById(id: string, updateHabitatDto: UpdateHabitatDto): Promise<Habitat> {
    return this.habitatModel.findByIdAndUpdate(id, updateHabitatDto, { new: true }).exec();
  }

  async updateManyByProperties(originalFilter: Record<keyof Habitat, any>, updateHabitatDto: UpdateHabitatDto): Promise<Habitat[]> {
    const originalFilterValues = { ...originalFilter };
    const updatedFilter = { ...originalFilter, ...updateHabitatDto };
    const updateResult = await this.habitatModel.updateMany(originalFilterValues, updateHabitatDto).exec();
    return this.findManyByProperties(updatedFilter);
  }

  async removeOneById(id: string): Promise<Habitat> {
    return this.habitatModel.findByIdAndDelete(id).exec();
  }

  async removeManyByProperties(properties: Record<keyof Habitat, any>): Promise<Habitat[]> {
    const documentsToRemove = await this.findManyByProperties(properties);
    const removedHabitat = await this.habitatModel.deleteMany(properties).exec();
    if (removedHabitat.deletedCount > 0) {
      return documentsToRemove;
    } else {
      return [];
    }
  }


}
