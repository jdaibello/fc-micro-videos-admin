import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories-module/categories.module';
import { DatabaseModule } from './database-module/database.module';
import { ConfigModule } from './config-module/config.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
})
export class AppModule {}
