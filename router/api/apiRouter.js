const express = require('express')
const apiRouter = express.Router()

const climateRouter = require('./climateRouter/climateRouter')

apiRouter.use((req, res, next)=>{
    console.log('api')
    next()
})
apiRouter.use('/climate', climateRouter)

module.exports = apiRouter