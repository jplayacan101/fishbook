import { Module } from '@nestjs/common';
import { ConservationEffortsController } from './conservation-efforts.controller';
import { ConservationEffortsService } from './conservation-efforts.service';
import { ConservationEffort, ConservationEffortSchema } from './schemas/conservation-efforts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ConservationEffort.name, schema: ConservationEffortSchema }])],
  controllers: [ConservationEffortsController],
  providers: [ConservationEffortsService]
})
export class ConservationEffortsModule {}
