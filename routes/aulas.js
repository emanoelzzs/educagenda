const express = require("express")
const { listar, salvar, remover } = require("../services/aulaService")

const router = express.Router()

router.get("/", async (req, res) => {
  res.json(await listar())
})

router.get("/:id", async (req, res, next) => {
  try {
    const aulas = await listar()
    const aula = aulas.find(a => a.id === Number(req.params.id))

    if (!aula) {
      const erro = new Error("Aula nao encontrada")
      erro.status = 404
      return next(erro)
    }

    res.json(aula)
  } catch (erro) {
    next(erro)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const aula = await salvar(req.body || {})
    res.status(201).json(aula)
  } catch (erro) {
    next(erro)
  }
})

router.delete("/:id", async (req, res, next) => {
  const removida = await remover(Number(req.params.id))

  if (!removida) {
    const erro = new Error("Aula nao encontrada")
    erro.status = 404
    return next(erro)
  }

  res.status(204).send()
})

module.exports = router