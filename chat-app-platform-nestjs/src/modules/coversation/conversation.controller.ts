import { Auth } from '@common/decorators';
import { UserContext } from '@common/decorators/user-context.decorator';
import { IUserContext } from '@common/types';
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

@ApiTags('conversations')
@Auth()
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  // payload gui len thi cai phan payload o nhung nguoi nhan thi se la array
  // ngoai ra nen co them type
  @Post()
  createConversation(
    @UserContext() userCtx: IUserContext,
    @Body() payload: CreateConversationRequest,
  ) {
    return this.conversationService.createConversation(userCtx, payload);
  }

  // pagination
  @Get()
  getConversations(@UserContext() { id }: IUserContext) {
    return this.conversationService.getConversations(id);
  }

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
