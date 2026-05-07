import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dacha } from './dacha.entity';
import { User } from './user.entity';
import { Settings } from './settings.entity';
import { Booking } from './booking.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dacha.db',
      entities: [Dacha, User, Settings, Booking],
      synchronize: true, // Auto-create database tables
    }),
    TypeOrmModule.forFeature([Dacha, User, Settings, Booking]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
