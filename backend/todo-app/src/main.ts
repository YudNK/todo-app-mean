import express, { Express, Request, Response } from "express";
import { ItemService } from "./service/itemService";

const app: Express = express();
const port: number = parseInt(process.env.PORT ?? "8080");
const itemService: ItemService = new ItemService();

// config middleware
app.use(express.urlencoded());
app.use(express.json());

// log: route
app.use((req: Request, res: Response, next: any) => {
    console.log(req.url);
    console.log(req.method);
    next();
});

// CORS controll
app.use((req: Request, res: Response, next: any) => {
    res.set("Access-Control-Allow-Origin", process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
    next();
});
app.options("/item{/:id}", (req: Request, res: Response, next: any) => {
    try {
        res.set({
            "Access-Control-Allow-Methods": "PUT, DELETE",
            "Access-Control-Allow-Headers": "content-type",
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// http method route
app.get("/item", itemService.selectItems);
app.post("/item", itemService.insertItem);
app.put("/item/:id", itemService.updateItemById);
app.delete("/item/:id", itemService.deleteItemById);

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