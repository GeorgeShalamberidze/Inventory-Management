import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
  inventoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      place: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.inventoryForm.value);
    // You can add the logic to send the form's data to your server here
    // After that, you may want to reset the form
    this.inventoryForm.reset();
  }

  get name() {
    return this.inventoryForm.get('name');
  }

  get price() {
    return this.inventoryForm.get('price');
  }

  get place() {
    return this.inventoryForm.get('place');
  }
}
