import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AccountsModule } from '../modules/accounts/accounts.module';
import { TodosModule } from '../modules/todos/todos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') ?? 'localhost',
        port: configService.get<number>('DATABASE_PORT') ?? 5432,
        username: configService.get('DATABASE_USERNAME') ?? 'postgres',
        password: configService.get('DATABASE_PASSWORD') ?? 'postgres',
        synchronize: configService.get<boolean>('DATABASE_SYNC') ?? true,
        logging: configService.get<boolean>('DATABASE_LOGGING') ?? true,
        database: configService.get('DATABASE_NAME') ?? 'todo_db',
        ssl: configService.get<boolean>('DATABASE_SSL') ?? false,
        namingStrategy: new SnakeNamingStrategy(),
        autoLoadEntities: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    // AccountsModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
