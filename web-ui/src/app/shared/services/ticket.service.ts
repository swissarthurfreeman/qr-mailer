import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Ticket } from "../model/Ticket.model";

@Injectable({
    'providedIn': 'root'
})
export class TicketService {
    constructor(private http: HttpClient) {}

    postTicket(ticket: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(`${environment.apiUrl}/new-ticket`, ticket);
    }
}

