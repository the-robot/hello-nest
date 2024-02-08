import {
  Controller,
  HttpCode,
  Get,
  Body,
  Delete,
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
  private readonly authSecret

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly configService: ConfigService,
  ) {
    // hard-coded secret for simplicity in demo application.
    this.authSecret = this.configService.get('AUTH_SECRET')
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFeedback(
    @Body() body: CreateFeedbackDto & { _secret: string },
  ): Promise<void> {
    if (body._secret !== this.authSecret) {
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

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFeedbacks(
    @Body() body: { _secret: string },
  ): Promise<void> {
    if (body._secret !== this.authSecret) {
      throw new UnauthorizedException('Unauthorized')
    }
    await this.feedbackService.deleteFeedbacks()
  }
}
