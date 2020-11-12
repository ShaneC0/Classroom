import { Router } from "express";
import authRouter from "./auth/auth.router"
import classRouter from "./class/class.router"
import { authorize } from "./util/middleware"

const apiRouter = Router();

apiRouter.get('/', (req, res, next) => {
    if(req.user) {
        return res.json({user: req.user})
    } else {
        return res.json({user: null})
    }
})

apiRouter.use('/auth', authRouter)
apiRouter.use('/class', authorize, classRouter)

export default apiRouter;