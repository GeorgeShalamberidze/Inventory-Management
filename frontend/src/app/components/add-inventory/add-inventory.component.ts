import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IInventory from 'src/interfaces/Inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
  inventoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    this.inventoryService.addInventoryItem(this.inventoryForm.value).subscribe({
      next: (data: IInventory[]) => console.log(data),
      error: (err) => console.error(err),
    });
    this.inventoryForm.reset();
  }

  get name() {
    return this.inventoryForm.get('name');
  }

  get price() {
    return this.inventoryForm.get('price');
  }

  get location() {
    return this.inventoryForm.get('location');
  }
}
