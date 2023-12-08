import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateReourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './schemas/resource.schema';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
  ) {}

  async create(createReourceDto: CreateReourceDto): Promise<Resource> {

    const { ...resourceDto } = createReourceDto;

    
    const createdResource = new this.resourceModel({
        ...resourceDto,
      });

    return createdResource.save();
  }

  async createMany(createReourceDtos: CreateReourceDto[]): Promise<Resource[]> {
    const resources = await Promise.all(
      createReourceDtos.map((dto) => this.create(dto))
    );
    return resources;
  }

  async findOneById(id: string): Promise<Resource> {
    return this.resourceModel.findById(id).exec();
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().exec();
  }

  async findManyByProperties(properties: Record<keyof Resource, any>): Promise<Resource[]> {  
    return this.resourceModel.find(properties).exec();
  }
  

  async updateOneById(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    return this.resourceModel.findByIdAndUpdate(id, updateResourceDto, { new: true }).exec();
  }

  async updateManyByProperties(originalFilter: Record<keyof Resource, any>, updateResourceDto: UpdateResourceDto): Promise<Resource[]> {
    const originalFilterValues = { ...originalFilter };
    const updatedFilter = { ...originalFilter, ...updateResourceDto };
    const updateResult = await this.resourceModel.updateMany(originalFilterValues, updateResourceDto).exec();
    return this.findManyByProperties(updatedFilter);
  }

  async removeOneById(id: string): Promise<Resource> {
    return this.resourceModel.findByIdAndDelete(id).exec();
  }

  async removeManyByProperties(properties: Record<keyof Resource, any>): Promise<Resource[]> {
    const documentsToRemove = await this.findManyByProperties(properties);
    const removedResource = await this.resourceModel.deleteMany(properties).exec();
    if (removedResource.deletedCount > 0) {
      return documentsToRemove;
    } else {
      return [];
    }
  }


}
