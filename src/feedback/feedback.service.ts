import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { FeedbackDocument } from '@database/schema'
import { CreateFeedbackDto } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback')
    private readonly feedbackModel: Model<FeedbackDocument>,
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
    // Generate a random delay between 1 and 5 seconds
    const delayInSeconds = Math.floor(Math.random() * (5 - 1 + 1)) + 1

    // Wait for the randomly generated delay
    await new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000))
  }
}
