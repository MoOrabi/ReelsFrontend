import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ReelsComponent } from './reels/reels.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'signin', component:SignInComponent},
  {path:'home', component:HomeComponent},
  {path:'reels', component:ReelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
