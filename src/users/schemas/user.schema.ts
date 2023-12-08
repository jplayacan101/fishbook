import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Fish } from 'src/fishes/schemas/fish.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Fishes' }] })
  favorites: Fish[];
}

export const UserSchema = SchemaFactory.createForClass(User);
