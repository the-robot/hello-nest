import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { FeedbackDocument } from '@database/schema'
import { CreateFeedbackDto } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback')
    private readonly feedbackModel: Model<FeedbackDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createFeedback({
    title,
    message,
    contactEmail,
  }: CreateFeedbackDto): Promise<void> {
    await this.simulateExpensiveOperation()

    const feedback = new this.feedbackModel({
      title: title.trim(),
      message: message.trim(),
      contactEmail: contactEmail.trim(),
    })
    console.log(
      `Received feedback | title: ${title} | contactEmail: ${contactEmail}`,
    )
    await feedback.save()
  }

  async getFeedbacks(page: number): Promise<FeedbackDocument[]> {
    if (page < 1) {
      throw new BadRequestException('Invalid page number')
    }
    const limit = 25
    const skip = (page - 1) * limit
    return this.feedbackModel
      .find()
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async deleteFeedbacks(): Promise<void> {
    await this.feedbackModel.deleteMany({})
  }

  // Simulate an expensive operation (e.g., CPU-intensive task or delay) with random duration
  private async simulateExpensiveOperation(): Promise<void> {
    // Define the duration of the CPU-bound operation in milliseconds (e.g., 5 seconds)
    const durationInMilliseconds =
      this.configService.get<number>('CPU_DURATION')

    const loopCount = this.configService.get<number>('CPU_LOOP')

    // Get the current timestamp to track the start time of the operation
    const startTime = Date.now()

    // Perform CPU-bound computations in a loop for the specified duration
    while (Date.now() - startTime < durationInMilliseconds) {
      // Example CPU-bound computation: Calculate Fibonacci sequence
      let a = 0,
        b = 1,
        temp
      for (let i = 0; i < loopCount; i++) {
        temp = a
        a = b
        b = temp + b
      }
    }
  }
}
