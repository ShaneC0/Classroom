import { Router } from "express";
import { getRepository } from "typeorm";
import Enrollment from "../../entity/Enrollment";

import Lesson from "../../entity/Lesson";

const lessonRouter = Router();

lessonRouter.get("/all", async (req, res, next) => {
  const enrollmentRepository = getRepository(Enrollment);
  const enrollments = await enrollmentRepository
    .createQueryBuilder("enrollment")
    .where("enrollment.studentId = :id", { id: req.user.id })
    .leftJoinAndSelect("enrollment.lesson", "lesson")
    .getMany();

  const lessons = enrollments.map((enrollment) => enrollment.lesson);

  res.json({ lessons });
});

lessonRouter.post("/create", async (req, res, next) => {
  const repository = getRepository(Lesson);
  const enrollmentRepository = getRepository(Enrollment);
  //validate body
  //create class object

  console.log("request body", req.body)

  const createdLesson = await repository.create({
    name: req.body.name,
    period: req.body.period,
  });

  //save class object
  await repository.save(createdLesson);
  //return class object
  const savedLesson = await repository.findOne({ name: req.body.name });

  const createdEnrollment = await enrollmentRepository.create({
    studentId: req.user.id,
    lessonId: savedLesson.id,
  });

  await enrollmentRepository.save(createdEnrollment);

  return res.json({ lesson: savedLesson });
});

lessonRouter.post("/join/:id", async (req, res, next) => {
  //with user id from token and class id from params
  //make enrollment and return it
  const repository = getRepository(Enrollment)
  const createdEnrollment = await repository.create({
    studentId: req.user.id,
    lessonId: parseInt(req.params.id)
  })

  await repository.save(createdEnrollment)

  res.json({enrollment: createdEnrollment})
});

export default lessonRouter;
