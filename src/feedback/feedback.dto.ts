import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsOptional()
  contactEmail: string
}
