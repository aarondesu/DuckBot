import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/discord', passport.authenticate('discord'));
router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (_req, res) => {
    res.redirect('http://localhost:8080/');
  }
);

export default router;
