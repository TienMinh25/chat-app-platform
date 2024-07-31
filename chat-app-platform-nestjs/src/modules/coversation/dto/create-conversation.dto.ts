import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ConversationType } from '../conversation.enum';

export class CreateConversationRequest {
  @ApiProperty({ isArray: true })
  @IsUUID(4, { each: true })
  @IsArray()
  recipients: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ enum: ConversationType })
  @IsEnum(ConversationType)
  @IsNotEmpty()
  type: ConversationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
