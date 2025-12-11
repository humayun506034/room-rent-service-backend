import express, { Request, Response } from 'express'
import cors from 'cors';
import globalErrorHandler from './app/middlewares/global_error_handler'
import notFound from './app/middlewares/not_found_api'
import cookieParser from 'cookie-parser'
import appRouter from './routes'

// define app
const app = express()

// middleware
app.use(cors({
    origin: ["http://localhost:3000","https://yannyamba-sd.vercel.app","*"]
}))

app.use(express.json({ limit: "5000mb" })); // increase JSON body limit
app.use(express.urlencoded({ limit: "5000mb", extended: true })); // increase form body limit

app.use(express.raw())
app.use(cookieParser())
app.use("/api", appRouter)



// stating point
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running successful !!',
        data: null,
    });
});



// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;