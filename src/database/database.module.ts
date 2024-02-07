import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: `${
          configService.get('DB_PROTOCOL') ?? 'mongodb'
        }://${configService.get('DB_USERNAME')}:${configService.get(
          'DB_PASSWORD',
        )}@${configService.get('DB_ENDPOINT')}/${configService.get(
          'DB_DATABASE',
        )}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
