import { Router } from "express";
import { getRepository } from "typeorm";

import Lesson from "../../entity/Lesson"
import lessonSchema from "./lesson.schema";

const lessonRouter = Router();

lessonRouter.get("/all", async (req, res, next) => {
    //returns all lessons where the teacher id is the same as req.user from token
    const repository = getRepository(Lesson)
    const allLessons = await repository.find({teacherId: req.user.id});
    return res.json({lessons: allLessons})
});

lessonRouter.get('/view/:id', async(req, res, next) => {
    const repository = getRepository(Lesson);
    const existingLesson = await repository.findOne(req.params.id)
    if(!existingLesson) {
        return next()
    }
    return res.json({lesson: existingLesson})
})

lessonRouter.post("/create", async(req, res, next) => {
    const repository = getRepository(Lesson)
    //validate body
    await lessonSchema.validate({...req.body}).catch(err => next(err))
    //create class object

    const createdLesson = await repository.create({...req.body, teacherId: req.user.id})
    //save class object
    await repository.save(createdLesson)
    //return class object
    const savedLesson = await repository.findOne({name: req.body.name})
    return res.json({lesson: savedLesson})
})

lessonRouter.post("/join/:id", async(req, res, next) => {
    res.json("Join class route")
    //send request to add user to class from token
})


export default lessonRouter;
