import { PostModule } from './../post/post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { CommentModule } from './../comment/comment.module';
import { UploadModule } from './../upload/upload.module';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      cors: {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', '/uploads'),
      serveRoot: '/uploads/',
    }),
    AuthModule,
    PostModule,
    UploadModule,
    UserModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
