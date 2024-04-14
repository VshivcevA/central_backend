const express = require('express')
const rootRouter = express.Router()

const apiRouter = require('./api/apiRouter')
rootRouter.use((req, res, next)=> {
    console.log("router")
    next()
})
rootRouter.use('/api', apiRouter)

module.exports = rootRouter;
