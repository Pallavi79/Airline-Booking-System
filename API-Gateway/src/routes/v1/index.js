const express = require('express');
const router = express.Router();
const userRouter = require('./user-routes');
const { AuthRequestMiddleware } = require('../../middlewares');
const {InfoController} = require('../../controllers');

router.get('/info',InfoController.info);

router.use('/user', userRouter);

module.exports = router;