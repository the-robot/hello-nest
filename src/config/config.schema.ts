import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class ConfigSchema {
  /*
   * Application Environments.
   * production, staging, development, test
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  NODE_ENV: string

  /*
   * DB Env Vars.
   */
  @Type(() => String)
  @IsString()
  DB_PROTOCOL: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  DB_ENDPOINT: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  DB_DATABASE: string

  /*
   * Auth Env Vars.
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_SECRET: string
}
