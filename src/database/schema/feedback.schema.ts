import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type FeedbackDocument = mongoose.HydratedDocument<Feedback>

@Schema({ timestamps: true })
export class Feedback {
  _id: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  message: string

  @Prop({})
  contactEmail: string
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)
