import { Controller, Get, Post, Body, Param, Put, Delete, Query, Logger } from '@nestjs/common';
import { UsersService} from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto | CreateUserDto[]): Promise<User | User[]> {
    if (Array.isArray(createUserDto)) {
      return this.usersService.createMany(createUserDto);
    } else {
      return this.usersService.create(createUserDto);
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('properties')
  findManyByProperties(@Query() query: Record<keyof User, any>): Promise<User[]> {
    return this.usersService.findManyByProperties(query);
  }

  @Put('id/:id')
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateOneById(id, updateUserDto);
  }

  @Put('properties')
  updateManyByProperties(
    @Query() query: Record<keyof User, any>,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User[]> {
    return this.usersService.updateManyByProperties(query, updateUserDto);
  }


  @Delete('id/:id')
  removeOne(@Param('id') id: string): Promise<User> {
    return this.usersService.removeOneById(id);
  }

  @Delete('properties')
  removeManyByProperties(
    @Query() query: Record<keyof User, any>,
  ): Promise<User[]> {
    return this.usersService.removeManyByProperties(query);
  }


}
