/* eslint-disable class-methods-use-this */
import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import DiscordAuthGuard from './utils/discord.guard';

@Controller('auth')
export default class AuthController {
  @Get('')
  root(@Res() res: Response) {
    res.status(200).send({ msg: 'ok' });
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('localhost:8080/dashboard');
  }

  @Get('logout')
  logut(@Req() req: Request) {
    req.logOut();
  }
}
