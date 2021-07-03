const router = require('express').Router();
const getCardsMiddlewares = require('../middlewares/getCardsMiddlewares');
const controller = require('../controllers/cards');
const { CardIdValidator, createCardValidator } = require('../middlewares/validators/index');

router.get('/', getCardsMiddlewares, controller.sendCards);
router.get('/:cardId', CardIdValidator, controller.sendCard);
router.post('/', createCardValidator, controller.createCard);
router.delete('/:cardId', CardIdValidator, controller.deleteCard);
router.put('/:cardId/likes', CardIdValidator, controller.likeCard);
router.delete('/:cardId/likes', CardIdValidator, controller.dislikeCard);

module.exports = router;
