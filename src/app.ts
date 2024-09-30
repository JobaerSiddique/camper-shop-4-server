import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalHandlerError'
const oring=["https://camper-shop-44.netlify.app","http://localhost:5173"]
app.use(cors({
  origin:oring,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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