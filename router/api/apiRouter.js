const express = require('express')
const apiRouter = express.Router()

const climateRouter = require('./climateRouter/climateRouter')
const hardwareRouter = require("./hardwareRouter/hardwareRouter");

apiRouter.use((req, res, next)=>{
    // console.log('api')
    next()
})
apiRouter.use('/climate', climateRouter)
apiRouter.use('/hardware', hardwareRouter)

module.exports = apiRouter