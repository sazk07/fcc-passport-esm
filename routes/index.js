import { Router } from 'express';
const router = Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.render('index', {
    title: 'Connected to Database',
    message: 'Please log in'
  });
});

export {
  router as indexRouter
}
