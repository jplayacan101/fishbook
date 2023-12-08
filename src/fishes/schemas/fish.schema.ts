// animal-profile.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Habitat } from '../../habitats/schemas/habitat.schema';
import { Taxonomy } from '../../taxonomies/schemas/taxonomy.schema';
import { ConservationEffort } from 'src/conservation-efforts/schemas/conservation-efforts.schema';

@Schema()
export class Fish extends Document {
  @Prop({ required: true })
  commonName: string;

  @Prop({ type: [String] })
  synonyms: string[];

  @Prop({ required: true })
  physicalDescription: string;

  @Prop({ type: Number })
  averageSize: number;

  @Prop({ type: Number })
  averageWeight: number;

  @Prop({ type: [String] })
  location: string[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Habitat' }] })
  habitats: Habitat[];

  @Prop({ required: true })
  eatingPatterns: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ required: true })
  behavior: string;

  @Prop({ type: Number })
  yearDiscovered: number;

  @Prop({ required: true })
  conservationStatus: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Taxonomy', required: true })
  taxonomy: Taxonomy;

  @Prop({ type: [String] })
  threats: string[];

  @Prop()
  video: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ConservationEffort' }] })
  conservationEffort: ConservationEffort[];
}


export const FishSchema = SchemaFactory.createForClass(Fish);
