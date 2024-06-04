const userRouter = require('./User')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
}


module.exports = initRoutes