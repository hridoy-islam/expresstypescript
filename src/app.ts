import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { userRoute } from './modules/user/user.route'
const app: Application = express()

// using cors middleware
app.use(cors())

// data parse
app.use(express.json()) // receive json data
app.use(express.urlencoded({ extended: true })) // url anchor data

// root router

app.use('/api/users', userRoute)

app.get('/', (req: Request, res: Response) => {
  const a = 20
  res.send(a)
})

export default app
