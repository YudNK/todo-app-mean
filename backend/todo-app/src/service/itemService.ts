import { Request, Response } from "express";
import { Item } from "../model/item";

export function selectItems(req: Request, res: Response, next: any): void {
    try {
       const item: Item = {
        id: "1234",
        status: true,
        task: "coding"
       }
       res.json(item); 
    } catch (error) {
       next(error); 
    }
}

export function insertItem(req: Request, res: Response, next: any): void {
    try {
        
    } catch (error) {
       next(error); 
    }
}

export function updateItemById(req: Request, res: Response, next: any): void {
    try {
        
    } catch (error) {
       next(error); 
    }
}

export function deleteItemById(req: Request, res: Response, next: any): void {
    try {
        
    } catch (error) {
       next(error); 
    }
}