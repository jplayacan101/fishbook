import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FishesModule } from './fishes/fishes.module';
import { HabitatsModule } from './habitats/habitats.module';
import { TaxonomiesModule } from './taxonomies/taxonomies.module';
import { ConservationEffortsModule } from './conservation-efforts/conservation-efforts.module';
import { UsersModule } from './users/users.module';
import { ResourcesModule } from './resource/resources.module';


@Module({
  imports: [FishesModule, MongooseModule.forRoot('mongodb://54.175.79.181:27017/fishbook'), HabitatsModule, TaxonomiesModule, ConservationEffortsModule, UsersModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
