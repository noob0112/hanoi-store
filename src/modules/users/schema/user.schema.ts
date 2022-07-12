import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampsMongodb } from 'src/common/schemas/time-stamps.schema';
import { ROLE_ENUM, STATUS_ENUM } from '../users.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends TimestampsMongodb {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop({ enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM;

  @Prop({ enum: STATUS_ENUM, default: STATUS_ENUM.PENDING })
  status: STATUS_ENUM;
}

export const UserSchema = SchemaFactory.createForClass(User);
