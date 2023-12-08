import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Resource extends Document {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  link: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
