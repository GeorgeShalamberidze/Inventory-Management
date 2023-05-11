import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Inventory from '../interfaces/Inventory';
import { environment } from 'src/environments/environment';

const URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  addInventoryItem(data: Inventory): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(URL, data);
  }

  getAllInventory(
    location: string,
    sortFieldName?: string,
    sortDirection?: string
  ): Observable<Inventory[]> {
    let url = `${URL}?location=${encodeURIComponent(location)}`;

    if (sortFieldName && sortDirection) {
      url += `&sortFieldName=${encodeURIComponent(
        sortFieldName
      )}&sortDirection=${encodeURIComponent(sortDirection)}`;
    }

    return this.http.get<Inventory[]>(url);
  }

  deleteItemFromInventory(id: number) {
    return this.http.delete<Inventory>(`${URL}/${id}`);
  }
}
