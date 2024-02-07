import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // get Address:Port (Host for backward compatibility)
  const address = process.env.ADDRESS || process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  console.log(`Running at: ${address}:${port}`)

  await app.listen(port, address)
}
bootstrap()
