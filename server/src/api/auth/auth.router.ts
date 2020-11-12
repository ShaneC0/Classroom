import { Router } from "express";
import { getRepository } from "typeorm";
import { hash, verify } from "argon2";
import * as jwt from "jsonwebtoken";
import * as yup from "yup";

import User from "../../entity/User";
import authSchema from "./auth.schema";

const authRouter = Router();

authRouter.post("/signup", async (req, res, next) => {
  const repository = getRepository(User);

  const validBody = await authSchema.isValid({ ...req.body });

  if (!validBody) {
    return next(new Error("Validation Error"));
  }

  const existingUser = await repository.findOne({ email: req.body.email });

  if (existingUser) {
    return next(new Error("Email in use"));
  }

  const hashedPassword = await hash(req.body.password);

  const createdUser = await repository.create({
    ...req.body,
    password: hashedPassword,
  });

  await repository.save(createdUser);

  const user = await repository.findOne({ email: req.body.email });

  jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 10,
    },
    (err, token) => {
      if (err) {
        return next(err);
      } else {
        delete user.password;
        return res.json({ user, token });
      }
    }
  );
});

authRouter.post("/signin", async (req, res, next) => {
  const repository = getRepository(User);

  const validBody = await authSchema.isValid({ ...req.body });

  if (!validBody) {
    return next(new Error("Validation Error"));
  }

  const existingUser = await repository.findOne({ email: req.body.email });

  if (!existingUser) {
    return next(new Error("User doesn't exist"));
  }

  if (await verify(existingUser.password, req.body.password)) {
    jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 10,
      },
      (err, token) => {
        if (err) {
          return next(err);
        } else {
          delete existingUser.password;
          return res.json({ user: existingUser, token });
        }
      }
    );
  } else {
    return next(new Error("Incorrect password"));
  }
});

export default authRouter;
