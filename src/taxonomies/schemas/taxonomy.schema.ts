import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Taxonomy extends Document {
  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  kingdom: string;

  @Prop({ required: true })
  phylum: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  genus: string;
}

export const TaxonomySchema = SchemaFactory.createForClass(Taxonomy);
