import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FishesModule } from './fishes/fishes.module';
import { HabitatsModule } from './habitats/habitats.module';
import { TaxonomiesModule } from './taxonomies/taxonomies.module';
import { ConservationEffortsModule } from './conservation-efforts/conservation-efforts.module';

@Module({
  imports: [FishesModule, MongooseModule.forRoot('mongodb://54.237.216.106:27017/fishbook'), HabitatsModule, TaxonomiesModule, ConservationEffortsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
