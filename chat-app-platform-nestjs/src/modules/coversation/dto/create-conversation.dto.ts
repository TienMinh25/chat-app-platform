import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ConversationType } from '../conversation.enum';

export class CreateConversationRequest {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  createdById: string;

  @ApiProperty({ isArray: true })
  @IsUUID(4, { each: true })
  @IsArray()
  recipient: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: ConversationType })
  @IsEnum(ConversationType)
  @IsNotEmpty()
  type: ConversationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
