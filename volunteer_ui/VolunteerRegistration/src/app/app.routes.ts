import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CategoryProgramComponent } from './superadmin/category-program/category-program.component';
import { AddEventComponent } from './coordinator/add-event/add-event.component';
import { RegisterComponent } from './volunteer/register/register.component';
import { EventMappingComponent } from './coordinator/event-mapping/event-mapping.component';
import { CreateAdminComponent } from './superadmin/create-admin/create-admin.component';
import { CreateCoordinatorComponent } from './admin/create-coordinator/create-coordinator.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  
  { path: 'login', component: LoginComponent },
  
  {
    path: 'superadmin',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['superadmin'] },
  },
  
{ path: 'forgot-password', component: ForgotPasswordComponent },

{
  path: 'superadmin/programs',
  component: CategoryProgramComponent,
  canActivate: [authGuard],
  data: { roles: ['superadmin'] }
},

{
  path: 'coordinator',
  component: DashboardComponent,
  canActivate: [authGuard],
  data: { roles: ['coordinator'] }
},
{
  path: 'coordinator/add-event',
  component: AddEventComponent,
  canActivate: [authGuard],
  data: { roles: ['coordinator'] }
},

{
  path: 'volunteer/register',
  component: RegisterComponent
},

{
  path: 'coordinator/event-mapping',
  component: EventMappingComponent,
  canActivate: [authGuard],
  data: { roles: ['coordinator'] }
},

{
  path: 'superadmin/create-admin',
  component: CreateAdminComponent,
  canActivate: [authGuard],
  data: { roles: ['superadmin'] }
},

{
  path: 'admin/create-coordinator',
  component: CreateCoordinatorComponent,
  canActivate: [authGuard],
  data: { roles: ['admin'] }
},

{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [authGuard],
  data: { roles: ['admin', 'coordinator'] }
},
{
  path: 'change-password',
  component: ChangePasswordComponent,
  canActivate: [authGuard],
  data: { roles: ['admin', 'coordinator'] }
}


];
