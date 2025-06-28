import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../Core/services/ticket.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-ticket',
  standalone: true,
  imports: [ToastModule,
      TableModule,
      CommonModule,
      HttpClientModule,
      DropdownModule,
      FormsModule,
      ButtonModule ],
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.css',
})
export class ViewTicketComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);


  ticketId!: number;
  ticket: any;

  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.ticketService.getTicketById(this.ticketId).subscribe(data => {
      this.ticket = data;
    });
  }

  Back(){
    this.router.navigate(['/tickets']);
  }

}
