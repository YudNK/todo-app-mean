import { Component, input, output, inject, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [ReactiveFormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  itemService: ItemService = inject(ItemService);

  item = input<Item>();
  itemDeleted = output<string>();
  statusForm = new FormControl();

  ngOnInit() {
    this.statusForm.setValue(this.item()?.status);
  }

  updateItem() {
    const item: Item = {
      id: this.item()!.id,
      status: this.statusForm.value,
      task: this.item()!.task,
    };
    this.itemService.updateItem(item).then((item: Item) => {
      console.log(item);
    });
  }

  deleteItem() {
    this.itemService.deleteItem(this.item()!);
    this.itemDeleted.emit(this.item()!.id);
  }

}
