import { Component } from '@angular/core';
import Inventory from 'src/app/interfaces/Inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent {
  items: Inventory[] = [];
  itemsToDisplay: Inventory[] = [];
  page: number = 1;
  pageSize: number = 20;
  collectionSize: number = this.items.length;

  filterTerm: string = 'all';
  sortFieldName: 'name' | 'price' | '' = '';
  sortDirection: 'ASC' | 'DESC' | '' = '';

  constructor(private inventoryService: InventoryService) {
    this.fetchInventory();
  }

  refreshItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.itemsToDisplay = this.items.slice(startIndex, endIndex);
  }

  deleteItem(item: Inventory) {
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
    this.inventoryService
      .getAllInventory(this.filterTerm, this.sortFieldName, this.sortDirection)
      .subscribe({
        next: (res: Inventory[]) => {
          this.items = res;
          this.collectionSize = res.length;
          this.refreshItems();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  setSortField(field: 'name' | 'price' | '') {
    if (this.sortFieldName === field) {
      this.sortDirection =
        this.sortDirection === 'ASC'
          ? 'DESC'
          : this.sortDirection === 'DESC'
          ? ''
          : 'ASC';
    } else {
      this.sortFieldName = field;
      this.sortDirection = 'ASC';
    }

    this.fetchInventory();
  }
}
