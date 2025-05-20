import { TicketType } from './TicketType.enum';

export interface Record<T> {
    [Key: string]: T;      // mat-table expects an array of objects, something keyable, unlike Map<string, string>...
}

export class Ticket {
    formFields!: Record<string>;
    formCheckBoxes!: Record<boolean>;
    contactEmail: string | undefined;
    type!: TicketType;
    comment!: string;
}
