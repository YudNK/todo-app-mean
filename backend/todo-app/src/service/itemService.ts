import { Request, Response } from "express";
import { Item } from "../model/item";
import { MongoClient } from "mongodb";

export class ItemService {

    connUri: string = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PWD}@${process.env.DB_HOST_NAME}/${process.env.DB_NAME}`;
    client: MongoClient;

    constructor() {
        this.client = new MongoClient(this.connUri);
    }

    // use arrow function to avoid undefined "this" in callback.
    selectItems = async (req: Request, res: Response, next: any): Promise<void> => {
        try {
            await this.client.connect();
            const itemSource = this.client.db().collection("items");
            const items = await itemSource.find().toArray();
            res.json(items);

        } catch (error) {
            next(error);
        } finally {
            await this.client.close();
        }
    };

    insertItem = async (req: Request, res: Response, next: any): Promise<void> => {
        try {
            const item: Item = req.body;
            item.id = crypto.randomUUID();
            await this.client.connect();
            const itemSource = this.client.db().collection("items");
            const result = await itemSource.insertOne(item);

            if (result.acknowledged) {
                res.json(item);
            } else {
                throw new Error("failed insert.");
            }

        } catch (error) {
            next(error);
        } finally {
            await this.client.close();
        }
    }

    updateItemById = async (req: Request, res: Response, next: any): Promise<void> => {
        try {
            const targetId = req.params.id;
            const item: Item = req.body;
            await this.client.connect();
            const itemSource = this.client.db().collection("items");
            const result = await itemSource.updateOne(
                { id: targetId },
                { $set: { status: item.status } });

            if (result.acknowledged) {
                res.json(item);
            } else {
                throw new Error("failed update.");
            }

        } catch (error) {
            next(error);
        } finally {
            await this.client.close();
        }
    }

    deleteItemById = async (req: Request, res: Response, next: any): Promise<void> => {
        try {
            const targetId = req.params.id;
            await this.client.connect();
            const itemSource = this.client.db().collection("items");
            const result = await itemSource.deleteOne({ id: targetId });

            if (result.acknowledged) {
                res.status(200).end();
            } else {
                throw new Error("failed delete.");
            }

        } catch (error) {
            next(error);
        } finally {
            await this.client.close();
        }
    }
}
