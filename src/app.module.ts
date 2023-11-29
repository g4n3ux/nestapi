import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { imports } from './graphql/imports';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile: true,
    }),

    ConfigModule.forRoot({
      isGlobal:true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (ConfigService:ConfigService) => ({
        
        type: 'mysql',
        host: '127.0.0.1',
        port: ConfigService.get('PORT'),
        database:ConfigService.get('B_DATABASE'),
        username:ConfigService.get('DB_USERNAME'),
        password:ConfigService.get('DB_PASSWORD'),
        entities:[],
        synchronize:true,

      })
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (ConfigService:ConfigService) => ({
        
        type: 'mssql',
        host: '127.0.0.1',
        port: ConfigService.get('PORT2'),
        database:ConfigService.get('B_DATABASE2'),
        username:ConfigService.get('DB_USERNAME2'),
        password:ConfigService.get('DB_PASSWORD2'),
        entities:[],
        synchronize:true,
        options: { encrypt: false },

      })
    }),


    MongooseModule.forRoot('mongodb://127.0.0.1/app'),
    
  imports
],
 
})
export class AppModule {}
