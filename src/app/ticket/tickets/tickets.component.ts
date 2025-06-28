import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ToastModule,
    TableModule,
    CommonModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    ButtonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  providers: [MessageService]
})
export class TicketsComponent {

  private router = inject(Router);
  private ticketService = inject(TicketService);

  currentUser = this.ticketService.getUser();

  ticketFilter = {
  ticketNumber: '',
  tagNumber: '',
  technicianId:null,
  customerId:null,
  priority: null,
  ticketType: null,
  status: null,
  startDate: null,
  endDate: null,
  pageNumber: 1,
  pageSize: 5
};

statusOptions = [
  { label: 'New', value: 0 },
  { label: 'Inprogress', value: 1 },
  { label: 'Done', value: 2 }
];

priorityOptions = [
  { label: 'Low', value: 0 },
  { label: 'Medium', value: 1 },
  { label: 'High', value: 2 }
];

typeOptions = [
  { label: 'Manual', value: 0 },
  { label: 'Vist', value: 1 }
];

technicianUsers:any[]=[]
Customers:any[]=[]

tickets: any[] = [];
totalRecords: number = 0;
loading: boolean = false;

  

  ngOnInit(): void {
  this.loadTickets(); // initial load
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
      this.totalRecords = response.totalCount;
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
    technicianId:null,
    customerId:null,
    priority: null,
    ticketType: null,
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
    next: (response:any) => {
      this.technicianUsers = response;
    }
  });
}

loadCustomers(): void {
  this.ticketService.getCustomers().subscribe({
    next: (response:any) => {
      this.Customers = response;
    }
  });
}


viewTicket(id: number): void {
  this.router.navigate(['/view', id]);
}

}
