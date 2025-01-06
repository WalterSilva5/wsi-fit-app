import { AuthGuard } from './permissions/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { PermissionsGuard } from './permissions/permissions.guard';
import { Roles } from './state/roles/roles.enum';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ComponentsComponent } from './pages/components/components.component';
import { MuscleGroupComponent } from './pages/admin/muscle-group/muscle-group.component';
import { ExerciseComponent } from './pages/admin/exercise/exercise.component';
import { UserCreateComponent } from './pages/user/forms/create/user-create.component';
import { UserUpdateComponent } from './pages/user/forms/update/user-update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/update', component: UserUpdateComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'muscle-group', component: MuscleGroupComponent },
  { path: 'exercise', component: ExerciseComponent },
];



// export const routes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'auth/login', component: LoginComponent },
//   {
//     path: 'user',
//     component: UserComponent,
//     canActivate: [AuthGuard, PermissionsGuard],
//     data: { requiredRoles: [Roles.ADMIN] },
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
