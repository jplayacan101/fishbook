import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { Fish } from './schemas/fish.schema';
import { CreateFishDto } from './dto/create-fish.dto';
import { UpdateFishDto } from './dto/update-fish.dto';
import { Habitat } from 'src/habitats/schemas/habitat.schema';
import { Logger } from '@nestjs/common';
import { Taxonomy } from 'src/taxonomies/schemas/taxonomy.schema';
import { ConservationEffort } from 'src/conservation-efforts/schemas/conservation-efforts.schema';

@Injectable()
export class FishesService {
  constructor(
    @InjectModel(Fish.name) private fishModel: Model<Fish>,
    @InjectModel(Habitat.name) private readonly habitatModel: Model<Habitat>,
    @InjectModel(Taxonomy.name) private readonly taxonomyModel: Model<Taxonomy>,
    @InjectModel(ConservationEffort.name) private readonly conservationEffortModel: Model<ConservationEffort>,
  ) {}

  async create(createFishDto: CreateFishDto): Promise<Fish> {
    const { habitats, taxonomy, conservationEffort, ...fishDto } = createFishDto;

    const createdTaxonomy = new this.taxonomyModel(taxonomy);
    await createdTaxonomy.save();

    const createdConservationEffort = new this.conservationEffortModel(conservationEffort);
    await createdConservationEffort.save();

    const habitatsExist = await this.checkIfHabitatsExist(habitats);
    if (habitats && !habitatsExist) {
      throw new NotFoundException('One or more habitats do not exist');
    }

    const createdFish = new this.fishModel({
      ...fishDto,
      taxonomy: createdTaxonomy,
      conservationEffort: createdConservationEffort,
      habitats: habitats.map((habitat) => new this.habitatModel({ name: habitat })),
    });

    return createdFish.save();
  }

  async createMany(createFishDtos: CreateFishDto[]): Promise<Fish[]> {
    const fishes = await Promise.all(
      createFishDtos.map((dto) => this.create(dto))
    );
    return fishes;
  }

  private async checkIfHabitatsExist(habitatNames: string[]): Promise<boolean> {
    const habitats = await this.habitatModel.find({ name: { $in: habitatNames } }).exec();
    return habitats.length === habitatNames.length;
  }

  async findOneById(id: string): Promise<Fish> {
    return this.fishModel.findById(id).exec();
  }

  async findAll(): Promise<Fish[]> {
    return this.fishModel.find().exec();
  }

  async findManyByProperties(properties: Record<keyof Fish, any>): Promise<Fish[]> {  
    return this.fishModel.find(properties).exec();
  }

  async updateOneById(id: string, updateFishDto: UpdateFishDto): Promise<Fish> {
    return this.fishModel.findByIdAndUpdate(id, updateFishDto, { new: true }).exec();
  }

  async updateManyByProperties(originalFilter: Record<keyof Fish, any>, updateFishDto: UpdateFishDto): Promise<Fish[]> {
    const originalFilterValues = { ...originalFilter };
    const updatedFilter = { ...originalFilter, ...updateFishDto };
    const updateResult = await this.fishModel.updateMany(originalFilterValues, updateFishDto).exec();
    return this.findManyByProperties(updatedFilter);
  }

  async removeOneById(id: string): Promise<Fish> {
    const deletedFish = await this.fishModel.findByIdAndDelete(id).exec();
    if (deletedFish) {
      await this.taxonomyModel.findByIdAndDelete(deletedFish.taxonomy).exec();
    }
    return deletedFish;
  }

  async removeManyByProperties(properties: Record<keyof Fish, any>): Promise<Fish[]> {
    const documentsToRemove = await this.findManyByProperties(properties);
    const removedFish = await this.fishModel.deleteMany(properties).exec();
    Logger.log("hello boss")
    if (removedFish.deletedCount > 0) {
        Logger.log("kjhsdkak")
        const deletedTaxonomyIds = documentsToRemove.map(fish => fish.taxonomy._id);
        Logger.log(deletedTaxonomyIds)
        await this.taxonomyModel.deleteMany({ _id: { $in: deletedTaxonomyIds } }).exec();
        return documentsToRemove;
    } else {
        return [];
    }
  }
  
}
