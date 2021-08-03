/* eslint-disable class-methods-use-this */
import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { dashboardUrl } from '../config';
import DiscordAuthGuard from './utils/discord.guard';

@Controller('auth')
export default class AuthController {
  /*
   * GET /api/v1/auth/login
   * Intitiates discord oAuth
   */
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  /*
   * GET /api/v1/auth/redirect
   * Redirects to the dashboard
   */
  @Get('redirect?code=:code')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect(`${dashboardUrl}/dashboard`);
  }

  /*
   * GET /api/v1/auth/logout
   * Logs out from the session
   */
  @Get('logout')
  logut(@Req() req: Request) {
    req.logOut();
  }
}
