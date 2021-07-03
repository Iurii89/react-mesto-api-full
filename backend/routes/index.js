const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { registerValidator, loginValidator } = require('../middlewares/validators/index');
const controller = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', registerValidator, controller.createUser);
router.post('/signin', loginValidator, controller.login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
