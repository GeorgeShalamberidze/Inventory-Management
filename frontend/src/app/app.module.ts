import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { InventoryService } from './services/inventory.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, InventoryTableComponent, AddInventoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
