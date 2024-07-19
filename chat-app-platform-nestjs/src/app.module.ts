import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ExceptionFactoryModule } from '@common/factories/exception-factory/exception.factory.module';
import { AllExceptionsFilter } from '@common/filters';
import { AuthModule } from '@modules/auth/auth.module';
import { CustomI18nModule } from '@modules/custom-i18n/custom-i18n.module';
import { UserModule } from '@modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/typeorm';
import { MailModule } from './infrastructure/mail/mail.module';
import { QueueModule } from './infrastructure/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: process.env.POSTGRES_DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: entities,
      synchronize: true,
      extra: { charset: 'utf8mb4_unicode_ci' },
    }),
    UserModule,
    AuthModule,
    CustomI18nModule,
    ExceptionFactoryModule,
    AutomapperModule.forRoot([
      {
        name: 'classes',
        strategyInitializer: classes(),
      },
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),
    QueueModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
