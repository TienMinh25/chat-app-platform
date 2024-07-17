import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const redisFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisInstance = new Redis({
      host: configService.get('REDIS_HOST'),
      port: +configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASSWORD'),
      db: 0,
    });

    redisInstance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e.message}`);
    });

    redisInstance.on('connect', () => {
      new Logger().debug('Connecting to redis 🙆🏻‍♂️🤜🏻🐥🤜🏻');
    });

    return redisInstance;
  },
};
