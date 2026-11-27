const express = require("express")
const aulasRouter = require("./routes/aulas")

const app = express()
app.use(express.json())
app.use("/aulas", aulasRouter)

app.use((req, res) => {
  res.status(404).json({ erro: "Rota nao encontrada" })
})

app.use((erro, req, res, next) => {
  res.status(erro.status || 500).json({ erro: erro.message })
})

module.exports = app