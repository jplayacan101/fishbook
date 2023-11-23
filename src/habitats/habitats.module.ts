import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitatsController } from './habitats.controller';
import { HabitatsService } from './habitats.service';
import { Habitat, HabitatSchema } from './schemas/habitat.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Habitat.name, schema: HabitatSchema }])],
  controllers: [HabitatsController],
  providers: [HabitatsService]
})
export class HabitatsModule {}
