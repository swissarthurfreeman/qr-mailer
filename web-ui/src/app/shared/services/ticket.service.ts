import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    'providedIn': 'root'
})
export class TicketService {
    constructor(private http: HttpClient) {}

    postTicket(ticket: any): Observable<string> {
        console.log("ticket", ticket);
        return this.http.post(`${environment.apiUrl}/new-ticket`, ticket, {responseType: 'text'});
    }
}

