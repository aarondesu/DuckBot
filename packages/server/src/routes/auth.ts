import express from 'express';
import passport from 'passport';
import { DASHBOARD_REDIRECT } from '../constants';

const router = express.Router();

router.get('/discord', passport.authenticate('discord'));
router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (_req, res) => {
    res.redirect(DASHBOARD_REDIRECT);
  }
);

router.get('/', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

export default router;
