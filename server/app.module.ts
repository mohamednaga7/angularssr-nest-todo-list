import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({ uri: `mongodb+srv://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@${configService.get<string>('DB_HOST')}/${configService.get<string>('DB_NAME')}?retryWrites=true&w=majority`, }),
      inject: [ConfigService],
    }),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/blog/browser'),
    }),
    TodosModule,
  ],
  controllers: [],
})
export class AppModule { }
