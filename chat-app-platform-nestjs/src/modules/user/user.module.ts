import { UserProfile } from '@common/mapping-profiles';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserProfile],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService, UserProfile],
})
export class UserModule {}
