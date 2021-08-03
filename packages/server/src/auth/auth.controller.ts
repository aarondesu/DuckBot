/* eslint-disable class-methods-use-this */
import { Controller, Get, Res, Req, UseGuards, Redirect } from '@nestjs/common';
import { Request, Response } from 'express';

import DiscordAuthGuard from './utils/discord.guard';

@Controller('auth')
export default class AuthController {
  /**
   * GET /api/v1/auth
   * Redirect root to auth/login
   */
  @Get()
  @Redirect('/api/v1/auth/login')
  root() {}

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
  @Get('redirect?')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.send(200);
  }

  /**
   * GET /api/v1/auth/status
   * Gets the user information
   */
  @Get('status')
  status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
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
