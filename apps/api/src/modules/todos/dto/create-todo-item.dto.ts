import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTodoItemDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TASK_STATUS_ENUM)
  status: TASK_STATUS_ENUM;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  list_id?: string;
}
