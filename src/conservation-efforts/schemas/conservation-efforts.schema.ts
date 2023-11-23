import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ConservationEffort extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  proponents: string;

  @Prop()
  description: string;

  @Prop()
  link: string;
}

export const ConservationEffortSchema = SchemaFactory.createForClass(ConservationEffort);
