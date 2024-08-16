import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import 'dotenv/config'

import errorMiddleware from './middlewares/error-middleware.js'

import { router } from './router/index.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	}),
)
app.use(cookieParser())

app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
