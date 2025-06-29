import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../Core/services/ticket.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Ticket } from '../../Core/model/ticket';
import { TicketPriority } from '../../Core/enum/ticket-priority.enum';
import { TicketStatus } from '../../Core/enum/ticket-status.enum';

@Component({
  selector: 'app-view-ticket',
  standalone: true,
  imports: [ToastModule,
      TableModule,
      CommonModule,
      DropdownModule,
      FormsModule,
      ButtonModule ],
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.css',
})
export class ViewTicketComponent {

  ticketId!: number;
  ticket?: Ticket;
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);


  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.getTicketById();
  }

  private getTicketById(){
    this.ticketService.getTicketById(this.ticketId).subscribe(data => {
      this.ticket = data;
    });
  }
  
  getPriorityLabel(status: number): string {
    return TicketPriority[status];
  }

  getStatusLabel(status: number): string {
    return TicketStatus[status];
  }
  
  Back(){
    this.router.navigate(['/tickets']);
  }
}