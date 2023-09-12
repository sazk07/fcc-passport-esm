import { Router } from 'express';
const router = Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: JSON.stringify(req.session.id), message: 'Please log in' });
});

export {
  router as indexRouter
}
