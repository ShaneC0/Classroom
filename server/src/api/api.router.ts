import { Router } from "express";
import authRouter from "./auth/auth.router"
import classRouter from "./class/class.router"

const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/class', classRouter)

export default apiRouter;