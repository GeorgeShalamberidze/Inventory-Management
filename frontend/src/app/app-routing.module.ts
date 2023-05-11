import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';

const routes: Routes = [
  { path: 'add-item', component: AddInventoryComponent },
  { path: 'inventory-table', component: InventoryTableComponent },
  { path: '', redirectTo: 'inventory-table', pathMatch: 'full' },
  { path: '**', redirectTo: 'inventory-table' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
