import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { TicketsComponent } from './ticket/tickets/tickets.component';
import { ViewTicketComponent } from './ticket/view-ticket/view-ticket.component';
import { AuthGuard } from './Core/auth.guard';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
    },
    {
        canActivate: [AuthGuard],
        path:"tickets",
        component: TicketsComponent
    },
    {
        canActivate: [AuthGuard],
        path:"view/:id",
        component:ViewTicketComponent
    }
];
