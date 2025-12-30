import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(data: any) {
  return this.http.post(
    `${this.API}/auth/login`,
    data,
    { withCredentials: true }
  );
}


  me() {
    return this.http.get<any>(
      `${this.API}/auth/me`,
      { withCredentials: true }
    );
  }

  // logout() {
  //   return this.http.post(
  //     `${this.API}/auth/logout`,
  //     {},
  //     { withCredentials: true }
  //   );
  // }

  forgotPassword(email: string) {
  return this.http.post<any>(
    `${this.API}/auth/forgot-password`,
    { email }
  );
}

resetPassword(data: any) {
  return this.http.post<any>(
    `${this.API}/auth/reset-password`,
    data
  );
}

getCategories() {
  return this.http.get<any[]>(
    `${this.API}/admin/categories`,
    { withCredentials: true }
  );
}

addCategory(name: string) {
  return this.http.post(
    `${this.API}/admin/categories`,
    { name },
    { withCredentials: true }
  );
}

getPrograms() {
  return this.http.get<any[]>(
    `${this.API}/admin/programs`,
    { withCredentials: true }
  );
}


addProgram(data: any) {
  return this.http.post(
    `${this.API}/admin/programs`,
    data,
    { withCredentials: true }
  );
}


addEvent(data: any) {
  return this.http.post(
    `${this.API}/coordinator/events`,
    data,
    { withCredentials: true }
  );
}

getCoordinatorEvents() {
  return this.http.get<any[]>(
    `${this.API}/coordinator/events`,
    { withCredentials: true }
  );
}

registerVolunteer(data: any) {
  return this.http.post(
    `${this.API}/volunteer/register`,
    data
  );
}

getProgramsPublic() {
  return this.http.get<any[]>(
    `${this.API}/admin/programs`
  );
}

getVolunteersForEvent(eventId: number) {
  return this.http.get<any[]>(
    `${this.API}/mapping/volunteers/${eventId}`,
    { withCredentials: true }
  );
}

assignVolunteers(data: any) {
  return this.http.post(
    `${this.API}/mapping/assign`,
    data,
    { withCredentials: true }
  );
}

createAdmin(data: any) {
  return this.http.post(
    `${this.API}/superadmin/create-admin`,
    data,
    { withCredentials: true }
  );
}

createCoordinator(data: any) {
  return this.http.post(
    `${this.API}/admin/create-coordinator`,
    data,
    { withCredentials: true }
  );
}

getProfile() {
  return this.http.get<any>(
    `${this.API}/profile/me`,
    { withCredentials: true }
  );
}

changePassword(data: any) {
  return this.http.post(
    `${this.API}/profile/change-password`,
    data,
    { withCredentials: true }
  );
}

logout() {
  return this.http.post(
    `${this.API}/profile/logout`,
    {},
    { withCredentials: true }
  );
}



}
