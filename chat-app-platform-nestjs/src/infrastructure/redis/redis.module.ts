import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisFactory } from './redis.client.factory';
import { RedisRepository } from './redis.repository';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [redisFactory, RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {}
