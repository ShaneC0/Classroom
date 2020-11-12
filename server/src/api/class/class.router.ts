import { Router } from "express";
import { getRepository } from "typeorm";

import Class from "../../entity/Class"
import classSchema from "./class.schema";

const classRouter = Router();

classRouter.get("/all", async (req, res, next) => {
    const repository = getRepository(Class)
    const allClasses = await repository.find();
    return res.json({classes: allClasses})
});

classRouter.get('/view/:id', async(req, res, next) => {
    const repository = getRepository(Class);
    const existingClass = await repository.findOne(req.params.id)
    if(!existingClass) {
        return next()
    }
    return res.json({class: existingClass})
})

classRouter.post("/create", async(req, res, next) => {
    const repository = getRepository(Class)
    //validate body
    await classSchema.validate({...req.body}).catch(err => next(err))
    //create class object
    const createdClass = await repository.create({...req.body})
    //save class object
    await repository.save(createdClass)
    //return class object
    const savedClass = await repository.findOne({name: req.body.name})
    return res.json({class: savedClass})
})


export default classRouter;
