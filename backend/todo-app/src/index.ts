import express, { Express } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req, res) => {
    res.send("hello, world.");
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
});