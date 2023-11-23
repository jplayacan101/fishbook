import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Taxonomy } from './schemas/taxonomy.schema';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';

@Injectable()
export class TaxonomiesService {
  constructor(
    @InjectModel(Taxonomy.name) private taxonomyModel: Model<Taxonomy>,
  ) {}

  async create(createTaxonomyDto: CreateTaxonomyDto): Promise<Taxonomy> {
    const createdTaxonomy = new this.taxonomyModel(createTaxonomyDto);
    return createdTaxonomy.save();
  }

  async createMany(createTaxonomyDtos: CreateTaxonomyDto[]): Promise<Taxonomy[]> {
    const Taxonomys = await Promise.all(
      createTaxonomyDtos.map((dto) => this.create(dto))
    );
    return Taxonomys;
  }

  async findOneById(id: string): Promise<Taxonomy> {
    return this.taxonomyModel.findById(id).exec();
  }

  async findAll(): Promise<Taxonomy[]> {
    return this.taxonomyModel.find().exec();
  }

  async findManyByProperties(properties: Record<keyof Taxonomy, any>): Promise<Taxonomy[]> {  
    return this.taxonomyModel.find(properties).exec();
  }

  async updateOneById(id: string, updateTaxonomyDto: UpdateTaxonomyDto): Promise<Taxonomy> {
    return this.taxonomyModel.findByIdAndUpdate(id, updateTaxonomyDto, { new: true }).exec();
  }

  async updateManyByProperties(originalFilter: Record<keyof Taxonomy, any>, updateHabitatDto: UpdateTaxonomyDto): Promise<Taxonomy[]> {
    const originalFilterValues = { ...originalFilter };
    const updatedFilter = { ...originalFilter, ...updateHabitatDto };
    const updateResult = await this.taxonomyModel.updateMany(originalFilterValues, updateHabitatDto).exec();
    return this.findManyByProperties(updatedFilter);
  }

  async removeOneById(id: string): Promise<Taxonomy> {
    return this.taxonomyModel.findByIdAndDelete(id).exec();
  }

  async removeManyByProperties(properties: Record<keyof Taxonomy, any>): Promise<Taxonomy[]> {
    const documentsToRemove = await this.findManyByProperties(properties);
    const removedHabitat = await this.taxonomyModel.deleteMany(properties).exec();
    if (removedHabitat.deletedCount > 0) {
      return documentsToRemove;
    } else {
      return [];
    }
  }

}
