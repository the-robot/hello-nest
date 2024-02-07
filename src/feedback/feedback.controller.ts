import {
  Controller,
  HttpCode,
  Get,
  Body,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common'

import { FeedbackDocument } from '@database/schema'
import { CreateFeedbackDto } from './feedback.dto'
import { FeedbackService } from './feedback.service'

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFeedback(
    @Body() body: CreateFeedbackDto,
  ): Promise<void> {
    await this.feedbackService.createFeedback({
      title: body.title,
      message: body.message,
      contactEmail: body.contactEmail,
    })
    return
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFeedbacksByPage(@Query() query: { page: number }): Promise<FeedbackDocument[]> {
    return await this.feedbackService.getFeedbacks(query.page)
  }
}
