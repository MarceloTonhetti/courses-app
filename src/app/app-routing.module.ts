import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module').then(module => module.CoursesModule)
  },
  {
    path: 'instructors',
    loadChildren: () => import('./modules/instructor/instructor.module').then(module => module.InstructorModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }