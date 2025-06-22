import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = environment["apiUrl"];

  constructor() { }

  async getItems(): Promise<Item[]> {
    const req = new Request(this.url, {
      method: "GET",
    });
    const res = await fetch(req);
    return await res.json() ?? [];
  }

  async createItem(item: Item): Promise<Item> {
    const req = new Request(this.url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(item), 
    });

    const res = await fetch(req);
    return await res.json() ?? {}
  }

  async updateItem(item: Item): Promise<Item> {
    const req = new Request(`${this.url}/${item.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(item), 
    });

    const res = await fetch(req);
    return await res.json() ?? {};
  }

  async deleteItem(item: Item): Promise<void> {
    const req = new Request(`${this.url}/${item.id}`, {
      method: "DELETE",
    });

    const res = await fetch(req);
  }
}
