import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Habitat extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop({ default: false })
  salinity: boolean;
}

export const HabitatSchema = SchemaFactory.createForClass(Habitat);
