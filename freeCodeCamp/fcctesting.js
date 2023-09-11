import { Router } from "express";
import { readFile } from 'fs'

const allowedOrigins = [
  /^https?:\/\/([\w-]+\.)*freecodecamp.org/,
  /^https:\/\/([\w-]+\.)*gitpod.io/,
  /^http:\/\/localhost:\d+/,
];

const router = Router()

router.use((req, res, next) => {
  const origin = req.get("origin")
  if (allowedOrigins.some((regex) => regex.test(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin)
    console.log(origin)
  }
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

router.get("/app", (req, res) => {
  console.log("requested")
  const appClone = { ...app }
  res.json(appClone)
})

router.get("/server.js", (req, res, next) => {
  console.log("requested")
  readFile(`${process.cwd()}/server.js`, (err, data) => {
    if (err) {
      return next(err)
    }
    res.send(data.toString())
  })
})

router.get("routes.js", (req, res, next) => {
  console.log("requested")
  readFile(`${process.cwd()}/routes.js`, (err, data) => {
    if (err) {
      return next(err)
    }
    res.send(data.toString())
  })
})

router.get("/auth.js", (req, res, next) => {
  console.log("requested")
  readFile(`${process.cwd()}/auth.js`, (err, data) => {
    if (err) {
      return next(err)
    }
    res.send(data.toString())
  })
})

router.get("/package.json"), (req, res, next) => {
  console.log("requested");
  readFile(`${process.cwd()}/package.json`, "utf-8", (err, data) => {
    if (err) {
      return next(err)
    }
    res.json(JSON.parse(data));
  });
};

router.get("/app-info", (req, res) => {
  const hs = Object.keys(res._headers).filter(
    (h) => !h.match(/^access-control-\w+/)
  )
  const hObj = {}
  hs.forEach((h) => {
    hObj[h] = res._headers[h]
  })
  delete res._headers["strict-transport-security"]
  res.json({ headers: hObj })
})

router.get("/app-stack", (req, res) => {
  console.log("requested")
  const stack = app._router.stack
  res.json(JSON.stringify(stack))
})

export {
  router as fccTesting
}
