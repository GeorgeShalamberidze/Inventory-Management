import { Component } from '@angular/core';
import IInventory from 'src/interfaces/Inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent {
  items: IInventory[] = [];
  page: number = 1;
  pageSize: number = 20;
  collectionSize: number = this.items.length;

  constructor(private inventoryService: InventoryService) {
    this.refreshItems();
    this.fetchInventory();
  }

  refreshItems() {
    this.items = this.items
      .map((item, i) => ({
        ...item,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  deleteItem(item: IInventory) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      for (let i = index; i < this.items.length; i++) {
        this.items[i].id = i + 1;
      }
      this.items = [...this.items];
    }
  }

  fetchInventory() {
    this.inventoryService.getAllInventory().subscribe({
      next: (res: IInventory[]) => {
        console.log(res);
        this.items = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
