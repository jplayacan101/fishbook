import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxonomiesController } from './taxonomies.controller';
import { TaxonomiesService } from './taxonomies.service';
import { Taxonomy, TaxonomySchema } from './schemas/taxonomy.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Taxonomy.name, schema: TaxonomySchema }])],
  controllers: [TaxonomiesController],
  providers: [TaxonomiesService]
})
export class TaxonomiesModule {}
