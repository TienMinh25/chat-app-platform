import { Auth } from '@common/decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { CreateConversationRequest } from './dto';
import { UserContext } from '@common/decorators/user-context.decorator';
import { IUserContext } from '@common/types';

@ApiTags('conversations')
@Auth()
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  // payload gui len thi cai phan payload o nhung nguoi nhan thi se la array
  // ngoai ra nen co them type
  @Post()
  createConversation(@Body() payload: CreateConversationRequest) {
    this.conversationService.createConversation(payload);
  }

  // pagination
  @Get()
  getConversations(@UserContext() userCtx: IUserContext) {}

  // pagination
  @Get(':conversationId')
  getConversationById(
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
  ) {}

  // tra ve khoang 15 tin nhan gan nhat neu co, khong co thi tra ve not found
  // payload can nhan la ten cua group or ten username cua nguoi dung
  @Post('/exist')
  checkConversationExists() {}
}
