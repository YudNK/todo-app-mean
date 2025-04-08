import express, { Express } from "express";

const app: Express = express();
const port: number = parseInt(process.env.PORT ?? "3000");

app.use(express.urlencoded());
app.use(express.json());

app.get("/item", (req, res) => {
});

app.post("/item", (req, res) => {
});

app.put("/item/:id", (req, res) => {
});

app.delete("/item/:id", (req, res) => {
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
});