import { AuthModule } from '@modules/auth/auth.module';
import { CustomI18nModule } from '@modules/custom-i18n/custom-i18n.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: entities,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CustomI18nModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
