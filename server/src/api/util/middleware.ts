import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

export const checkTokenSetUser = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if(err) {
              return next(err)
          } else {
              req.user = decoded
              return next();
          }
      })
    } else {
      return next();
    }
  } else {
    next();
  }
};

export const authorize = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    next(new Error('Not Authorized'))
  }
}
