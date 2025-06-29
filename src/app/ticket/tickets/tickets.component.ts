import { Component, inject, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Core/services/ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TicketStatus } from '../../Core/enum/ticket-status.enum';
import { enumToOptions } from '../../Core/utils/enum_utils';
import { TicketPriority } from '../../Core/enum/ticket-priority.enum';
import { Ticket } from '../../Core/model/ticket';
import { Customers } from '../../Core/model/customers';
import { User } from '../../Core/model/user';
import { ModalComponent } from '../../Core/component/modal/modal.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ToastModule,
    TableModule,
    CommonModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ModalComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  providers: [MessageService]
})
export class TicketsComponent {
  @ViewChild('forgotPassword') forgotPassword!: ModalComponent;

  technicianUsers: User[] = []
  Customers: Customers[] = []
  tickets: Ticket[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  selectedTicket?: Ticket;
  private ticketService = inject(TicketService);
  private router = inject(Router);
  currentUser = this.ticketService.getUser();

  ticketFilter = {
    ticketNumber: '',
    tagNumber: '',
    technicianId: null,
    customerId: null,
    priority: null,
    status: null,
    startDate: null,
    endDate: null,
    pageNumber: 1,
    pageSize: 5
  };

  statusOptions = enumToOptions(TicketStatus);
  priorityOptions = enumToOptions(TicketPriority);

  ngOnInit(): void {
    this.loadTechnicianUsers();
    this.loadCustomers();
  }

  onPageChange(event: any): void {
    this.ticketFilter.pageNumber = event.first / event.rows + 1;
    this.ticketFilter.pageSize = event.rows;
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.ticketService.getTickets(this.ticketFilter).subscribe({
      next: (response) => {
        this.tickets = response.items;
        this.totalRecords = response.totalCount || response.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  resetFilters(): void {
    this.ticketFilter = {
      ticketNumber: '',
      tagNumber: '',
      technicianId: null,
      customerId: null,
      priority: null,
      status: null,
      startDate: null,
      endDate: null,
      pageNumber: 1,
      pageSize: 5
    };
    this.loadTickets();
  }

  loadTechnicianUsers(): void {
    this.ticketService.getTechnicianUsers().subscribe({
      next: (response: User[]) => {
        this.technicianUsers = response;
      }
    });
  }

  loadCustomers(): void {
    this.ticketService.getCustomers().subscribe({
      next: (response: Customers[]) => {
        this.Customers = response;
      }
    });
  }

  viewTicket(id: number): void {
    this.selectedTicket = this.tickets.find(t => t.id === id);
    this.forgotPassword.show();
  }

  close(){
    this.forgotPassword.hide();
  }

  moreDetails(){
    this.router.navigate(['/view', this.selectedTicket?.id]);
  }

  getPriorityLabel(status: number): string {
    return TicketPriority[status];
  }

  getStatusLabel(status: number): string {
    return TicketStatus[status];
  }
}