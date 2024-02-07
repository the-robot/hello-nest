import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { FeedbackSchema } from '@database/schema'
import { FeedbackController } from './feedback.controller'
import { FeedbackService } from './feedback.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feedback', schema: FeedbackSchema }]),
  ],
  exports: [FeedbackService],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
