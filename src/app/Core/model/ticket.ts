import { TicketPriority } from "../enum/ticket-priority.enum";
import { TicketStatus } from "../enum/ticket-status.enum";

export class Ticket {
  id!: number;
  ticketNumber!: string;
  title!: string;
  description!: string;
  status!: TicketStatus;
  priority!: TicketPriority;
  createDate!: Date;
  updateDate!: Date | null;
  customerName!: string;
  tagName!: string;
  assignedToUserName!: string;
  areaName!: string;
  cityName!: string;
  countryName!: string;
}