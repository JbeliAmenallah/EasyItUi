import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Category } from '../../shared/models/category';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    getCategories(): Category[] {
      throw new Error('Method not implemented.');
    } 
    baseUrl: "http://localhost:8000";
    url: string = "http://localhost:8000";
    type: string = "type=";
    endpoint: string = 'categories'
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient) {}

    public create(category: Category): Observable<Category> { 
        return this.httpClient.post<Category>(`${this.url}/${this.endpoint}`, category);
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data);
    }

    public update(category: Category): Observable<Category> { 
        return this.httpClient.put<Category>(
            `${this.url}/${this.endpoint}/${category.id}`,
            category
        );
    }

    public read(id: number): Observable<Category> { 
        return this.httpClient.get<Category>(`${this.url}/${this.endpoint}/${id}`);
    }

    list(): Observable<Category[]> { 
        return this.httpClient.get<Category[]>(`${this.url}/${this.endpoint}`);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`);
    }

 
    

    public addFile(data: FormData, itemId: number, fileName: string) {
        return this.httpClient.post(
            `${this.url}/${this.endpoint}/${itemId}/${fileName}`,
            data
        );
    }
}