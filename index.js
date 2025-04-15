const express = require("express");

const server = express();

server.use(express.json());

const cursos = ["Node JS", "JavaScript", "React Native"];

server.get("/cursos", checkIndexCurso, (req, res) => {
  return res.json(cursos);
});

//localhost:3000/curso

function checkCurso(req, resp, next) {
  if (!req.body.name) {
    return resp.status(400).json({ error: "Nome do curso é obrigatório" });
  }

  return next();
}

function checkIndexCurso(req, resp, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return resp.status(400).json({ error: "O curso não existe" });
  }

  req.curso = curso;
  return next();
}

server.get("/cursos/:index", checkIndexCurso, (req, resp) => {
  const { index } = req.params;
  return resp.json(cursos[index]);
});

//Criando um novo Curso

server.post("/cursos", checkCurso, checkIndexCurso, (req, resp) => {
  const { name } = req.body;
  cursos.push(name);

  return resp.json(cursos);
});

//Atualizando um curso

server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, resp) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;
  return resp.json(cursos);
});

//Excluindo um curso

server.delete("/cursos/:index", checkIndexCurso, (req, resp) => {
  const { index } = req.params;
  cursos.splice(index, 1);
  return resp.json(cursos);
});

server.listen(3000);
