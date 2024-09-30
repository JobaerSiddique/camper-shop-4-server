import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalHandlerError'
const oring=["https://darling-gelato-f0a8a9.netlify.app","http://localhost:5000/"]
app.use(cors({
  origin:oring,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


// route 
app.use('/api/v1', router)


app.use(globalErrorHandler)
app.get('/', (req, res) => {
  res.send('Campers server is running Hurry!')
})

export default app;