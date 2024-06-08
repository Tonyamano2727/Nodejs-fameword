const userRouter = require('./User')
const PostRouter = require('./Post')
const {notFound , errHandler} = require('../Middleware/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/post', PostRouter)


    app.use(notFound)
    app.use(errHandler)
}
module.exports = initRoutes