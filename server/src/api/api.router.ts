import { Router } from "express";
import authRouter from "./auth/auth.router"
import lessonRouter from "./lesson/lesson.router"
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
apiRouter.use('/lesson', authorize, lessonRouter)

export default apiRouter;