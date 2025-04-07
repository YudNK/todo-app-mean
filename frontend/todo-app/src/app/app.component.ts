import { Component, inject, signal } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Item } from './model/item';
import { ItemService } from './service/item.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ItemComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  itemService: ItemService = inject(ItemService);

  title = 'todo-app'
  items = signal<Item[]>([]);
  taskForm = new FormControl("");

  constructor() {
    this.itemService.getItems().then((items: Item[]) => {
      this.items.set(items);
    });
  }

  addItem() {
    const item: Item = {
      id : "",
      status: false, 
      task: this.taskForm.value ?? ""
    };

    this.itemService.createItem(item).then((item: Item) => {
      this.items.update(value => [...value, item]);
    });
    this.taskForm.setValue("");
  }

  removeItem(id: string): void {
    this.items.update(value => value.filter(e => e.id !== id));
  }
}
