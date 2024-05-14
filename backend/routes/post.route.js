import express from 'express';

const router = express.Router();

router.get('/api/posts/', (req, res) => {
  res.send('works');
});

export default router;