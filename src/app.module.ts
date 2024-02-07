import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { validatedConfig } from './config/config.validate'
import { DatabaseModule } from '@database/database.module'
import { FeedbackModule } from '@feedback/feedback.module'

@Module({
  imports: [
    // core modules
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validatedConfig,
    }),

    DatabaseModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
