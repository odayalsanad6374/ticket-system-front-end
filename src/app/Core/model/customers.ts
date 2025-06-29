import { TicketPriority } from "../enum/ticket-priority.enum";
import { TicketStatus } from "../enum/ticket-status.enum";

export class Customers {
  id!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  areaId!: number;
}