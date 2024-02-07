import { plainToInstance } from 'class-transformer'
import { ConfigSchema } from './config.schema'
import { validateSync } from 'class-validator'

export function validatedConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ConfigSchema, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
