// when resolving TicketType from URL in new-ticket-form-container
// we uppercase type and coerce enum type via TicketType.
export enum TicketType {
    PRINTER = "PRINTER",
    MEETING_ROOM = "MEETING_ROOM",
    ASSET = "ASSET",
}