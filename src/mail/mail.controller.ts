import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MailService } from './mail.service';

dotenv.config();

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  sendEmail(
    @Body() body: { to: string; subject: string; html: string },
    @Headers('x-api-key') apiKey: string,
  ) {
    if (apiKey !== process.env.RELAY_SECRET) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return this.mailService.sendMail(body.to, body.subject, body.html);
  }
}
