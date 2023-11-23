import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FishesController } from './fishes.controller';
import { FishesService } from './fishes.service';
import { Fish, FishSchema } from './schemas/fish.schema';
import { Habitat, HabitatSchema } from 'src/habitats/schemas/habitat.schema';
import { Taxonomy, TaxonomySchema } from 'src/taxonomies/schemas/taxonomy.schema';
import { ConservationEffort, ConservationEffortSchema } from 'src/conservation-efforts/schemas/conservation-efforts.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fish.name, schema: FishSchema }]),
    MongooseModule.forFeature([{ name: Habitat.name, schema: HabitatSchema }]), 
    MongooseModule.forFeature([{ name: Taxonomy.name, schema: TaxonomySchema }]),
    MongooseModule.forFeature([{ name: ConservationEffort.name, schema: ConservationEffortSchema }]),  
  ],
  controllers: [FishesController],
  providers: [FishesService]
})
export class FishesModule {}

