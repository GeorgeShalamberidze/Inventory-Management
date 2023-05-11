import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Inventory from '../../interfaces/Inventory';

const URL: string = 'http://localhost:3001/inventories';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  addInventoryItem(data: Inventory): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(URL, data);
  }

  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(URL);
  }

  deleteItemFromInventory(id: number): Observable<Inventory> {
    return this.http.delete<Inventory>(`${URL}/${id}`);
  }
}