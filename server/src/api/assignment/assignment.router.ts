import { Router } from "express";
import { getRepository } from "typeorm";
import Assignment from "../../entity/Assignment";

const assignmentRouter = Router();

assignmentRouter.get("/all", async (req, res, next) => {
  const repository = getRepository(Assignment);

  const assignments = await repository.find();

  res.json({ assignments });
});

assignmentRouter.get("/class/:id", async (req, res, next) => {
  const repository = getRepository(Assignment);

  const assignments = await repository
    .createQueryBuilder("assignment")
    .where("assignment.lessonId = :id", { id: req.params.id })
    .leftJoinAndSelect("assignment.user", "user")
    .leftJoinAndSelect("assignment.lesson", "lesson")
    .getMany();

  res.json({ assignments });
});

assignmentRouter.post("/create", async (req, res, next) => {
  //REMEMBER TO VALIDATE BODY
  const repository = getRepository(Assignment);

  const createdAssignment = await repository.create({
    name: req.body.name,
    userId: req.user.id,
    lessonId: req.body.lessonId,
  });

  await repository.save(createdAssignment);

  const insertedAssignment = await repository.findOne({ name: req.body.name }, {relations: ["lesson", "user"]});

  res.json({ assignment: insertedAssignment });
});

export default assignmentRouter;
