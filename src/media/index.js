import express from "express"

const mediaRouter = express.Router()

mediaRouter.get("/", async (req, res, next) => {})
mediaRouter.get("/:id", async (req, res, next) => {})
mediaRouter.post("/", async (req, res, next) => {})
mediaRouter.put("/:id", async (req, res, next) => {})
mediaRouter.delete("/:id", async (req, res, next) => {})

export default mediaRouter