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
  itemsToDisplay: IInventory[] = [];
  page: number = 1;
  pageSize: number = 20;
  collectionSize: number = this.items.length;

  constructor(private inventoryService: InventoryService) {
    this.fetchInventory();
  }

  refreshItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.itemsToDisplay = this.items.slice(startIndex, endIndex);
  }

  deleteItem(item: IInventory) {
    this.inventoryService.deleteItemFromInventory(item.id).subscribe({
      next: () => {
        const index = this.items.indexOf(item);
        if (index !== -1) this.items.splice(index, 1);
        this.refreshItems();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchInventory() {
    this.inventoryService.getAllInventory().subscribe({
      next: (res: IInventory[]) => {
        this.items = res;
        this.collectionSize = res.length;
        this.refreshItems();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
