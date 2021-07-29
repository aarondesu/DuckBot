import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/discord', passport.authenticate('discord'));
router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (_req, res) => {
    res.status(200).send({ msg: ' ok ' });
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
