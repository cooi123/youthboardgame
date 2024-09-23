import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import InitSeeder from './database/seeds/init.seed';
import { MailerModule } from '@nestjs-modules/mailer';
import { MapModule } from './map/map.module';
import { MapEntity } from './map/map.entity';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Make the configuration globally available
      envFilePath: '.env',
    }),
    // Using TypeOrmModule.forRootAsync to access ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule
      inject: [ConfigService],  // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),  // Use ConfigService to access the variable
        port: configService.get<number>('DB_PORT') || 5432,  // Use environment variable or default to 5432
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'postgres',
        database: configService.get<string>('DB_DATABASE') || 'focusbear',
        entities: [UserEntity, MapEntity],
        synchronize: true,
        logging: true,
        seeds: [InitSeeder],
        factories: ["src/factories/**/*.factory.ts"]
      }),
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    AuthModule,

    MapModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
