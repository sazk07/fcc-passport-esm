import { Router } from 'express';
const router = Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FCC Advanced Node and Express' });
});

export {
  router as indexRouter
}
