import express, { Express, Request, Response } from "express";
import { deleteItemById, insertItem, selectItems, updateItemById } from "./service/itemService";

const app: Express = express();
const port: number = parseInt(process.env.PORT ?? "8080");

// config middleware
app.use(express.urlencoded());
app.use(express.json());

// log: route
app.use((req: Request, res: Response, next: any) => {
    console.log(req.url);
    console.log(req.headers);
    next();
});

// http method route
app.get("/item", selectItems);
app.post("/item", insertItem);
app.put("/item/:id", updateItemById);
app.delete("/item/:id", deleteItemById);

// error handling
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error("Error!");
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send("something wrong.");
});

// server start
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
});