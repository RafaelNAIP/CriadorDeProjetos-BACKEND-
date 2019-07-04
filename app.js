let projetos = [];
let valores = [];
var express = require("express");
var app = express();

app.use(express.json());
app.post("/projects", function(req, res) {
  console.log(req.body);
  res.json(req.body);
  projetos.push(req.body);
  console.log(projetos);
  valores.push([req.body.title, req.body.tasks]);
});

app.get("/projects", function(req, res) {
  res.send(valores);
});

app.put("/projects/:id", function(req, res) {
  app.use(function(err, req, res, next) {
    for (let a = 0; a < projetos.length; a++) {
      if (req.params.id == projetos[a].id) {
      } else {
        console.error(err.stack);
        res.status(500).send("Id inexistente!");
      }
    }
  });

  const sql = () => {
    for (let i = 0; i < projetos.length; i++) {
      if (projetos[i].id == req.params.id) {
        return i;
      }
    }
  };
  console.log(sql());
  projetos[sql()].title = req.body.title;
  res.send(projetos);
});

app.delete("/projects/:id", function(req, res) {
  app.use(function(err, req, res, next) {
    for (let a = 0; a < projetos.length; a++) {
      if (req.params.id == projetos[a].id) {
      } else {
        console.error(err.stack);
        res.status(500).send("Id inexistente!");
      }
    }
  });

  const procurarIndice = () => {
    for (let i = 0; i < projetos.length; i++) {
      if (req.params.id == projetos[i].id) {
        return i;
      }
    }
  };
  console.log(procurarIndice());
  console.log(req.params.id);
  console.log(projetos.splice(procurarIndice(), 1));
  res.send(projetos);
});

app.post("/projects/:id/tasks", function(req, res) {
  app.use(function(err, req, res, next) {
    for (let a = 0; a < projetos.length; a++) {
      if (req.params.id == projetos[a].id) {
      } else {
        console.error(err.stack);
        res.status(500).send("Id inexistente!");
      }
    }
  });

  const sql2 = () => {
    for (let i = 0; i < projetos.length; i++) {
      if (req.params.id == projetos[i].id) {
        return i;
      }
    }
  };

  projetos[sql2()].tasks.push(req.body.title);
  res.send(projetos);
});

app.listen(8000);
