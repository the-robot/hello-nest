import {
  Controller,
  HttpCode,
  Get,
  Body,
  HttpStatus,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common'

import { FeedbackDocument } from '@database/schema'
import { CreateFeedbackDto } from './feedback.dto'
import { FeedbackService } from './feedback.service'
import { ConfigService } from '@nestjs/config'

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFeedback(
    @Body() body: CreateFeedbackDto & { _secret: string },
  ): Promise<void> {
    // hard-coded secret for simplicity)
    if (body._secret !== this.configService.get('AUTH_SECRET')) {
      throw new UnauthorizedException('Unauthorized')
    }

    await this.feedbackService.createFeedback({
      title: body.title,
      message: body.message,
      contactEmail: body.contactEmail,
    })
    return
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFeedbacksByPage(
    @Query() query: { page?: number },
  ): Promise<FeedbackDocument[]> {
    return await this.feedbackService.getFeedbacks(query.page ?? 1)
  }
}
