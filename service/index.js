import express, { json, urlencoded } from "express";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const port = 8888;

app.post("/update", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://local.dasouche-inc.net:8080",
  );

  console.log(res);

  res.send(JSON.stringify({ hello: "world" }));
});

app.get("/download", (req, res) => {
  res.send(JSON.stringify({ hello: "world" }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
