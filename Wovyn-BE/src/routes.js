const routes = require('express').Router();
const userRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');

routes.use('/api/user', userRouter);
routes.use('/api/category', categoryRouter);
routes.use('/api/product', productRouter);

module.exports = routes;
