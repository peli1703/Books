import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [PrismaModule, BookModule, AuthModule, PassportModule, JwtModule.register({secret: 'secret', signOptions: { expiresIn: '1h'}})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
