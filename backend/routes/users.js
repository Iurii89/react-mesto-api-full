const router = require('express').Router();
const getUsersMiddlewares = require('../middlewares/getUsersMiddlewares');
const controller = require('../controllers/users');
const { sendUserValidator, updateUserValidator, updateAvatarValidator } = require('../middlewares/validators/index');

router.get('/', getUsersMiddlewares, controller.sendUsers);
router.get('/me', controller.getMe);
router.get('/:id', sendUserValidator, controller.sendUser);

router.patch('/me', updateUserValidator, controller.updateUser);
router.patch('/me/avatar', updateAvatarValidator, controller.updateAvatar);

module.exports = router;
