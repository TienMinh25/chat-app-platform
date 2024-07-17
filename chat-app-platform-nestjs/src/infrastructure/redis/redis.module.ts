import { Module } from '@nestjs/common';
import { redisFactory } from './redis.client.factory';
import { RedisRepository } from './redis.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [redisFactory, RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {}
