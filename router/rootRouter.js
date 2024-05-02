const express = require('express')
const rootRouter = express.Router()

const apiRouter = require('./api/apiRouter')
rootRouter.use((req, res, next)=> {
    // console.log("router")
    next()
})
rootRouter.use('/api/v1', apiRouter)

module.exports = rootRouter;
