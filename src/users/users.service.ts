import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Fish } from 'src/fishes/schemas/fish.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Fish.name) private readonly fishModel: Model<Fish>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const { favorites, ...userDto } = createUserDto;

    const fishesExist = await this.checkIfFishesExist(favorites);
    if (!fishesExist) {
      throw new NotFoundException('One or more fishes do not exist');
    }
    
    const createdUser = new this.userModel({
        ...userDto,
        favorites: favorites.map((fish) => new this.fishModel({ commonName: fish })),
      });

    return createdUser.save();
  }

  async createMany(createUserDtos: CreateUserDto[]): Promise<User[]> {
    const users = await Promise.all(
        createUserDtos.map((dto) => this.create(dto))
    );
    return users;
  }

  private async checkIfFishesExist(fishNames: string[]): Promise<boolean> {
    const fishes = await this.fishModel.find({ commonName: { $in: fishNames } }).exec();
    return fishes.length === fishNames.length;
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findManyByProperties(properties: Record<keyof User, any>): Promise<User[]> {  
    return this.userModel.find(properties).exec();
  }
  

  async updateOneById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async updateManyByProperties(originalFilter: Record<keyof User, any>, updateUserDto: UpdateUserDto): Promise<User[]> {
    const originalFilterValues = { ...originalFilter };
    const updatedFilter = { ...originalFilter, ...updateUserDto };
    const updateResult = await this.userModel.updateMany(originalFilterValues, updateUserDto).exec();
    return this.findManyByProperties(updatedFilter);
  }

  async removeOneById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async removeManyByProperties(properties: Record<keyof User, any>): Promise<User[]> {
    const documentsToRemove = await this.findManyByProperties(properties);
    const removedUser = await this.userModel.deleteMany(properties).exec();
    if (removedUser.deletedCount > 0) {
      return documentsToRemove;
    } else {
      return [];
    }
  }


}
