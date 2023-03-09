import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import { RequestListComponent } from './requests/request-list.component';
import { RequestProfileComponent } from './requests/request-profile.component';
import { VolunteerPageComponent } from './volunteer-page/volunteer-page.component';
import { ClientComponent } from './client/client.component';

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'users', component: UserListComponent, title: 'Users'},
  {path: 'users/new', component: AddUserComponent, title: 'Add User'},
  {path: 'users/:id', component: UserProfileComponent, title: 'User Profile'},
  {path: 'requests', component: RequestListComponent, title: 'Requests'},
  {path: 'requests/:id', component: RequestProfileComponent, title: 'Request Profile'},
  {path: 'volunteer', component: VolunteerPageComponent, title: 'Volunteer View'},
  {path: 'client', component: ClientComponent, title: 'Client View'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
