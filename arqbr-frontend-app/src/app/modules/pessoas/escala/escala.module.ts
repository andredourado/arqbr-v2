import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EscalaListComponent } from 'src/app/pages/pessoas/escala/escala-list/escala-list.component'
import { EscalaEditComponent } from 'src/app/pages/pessoas/escala/escala-edit/escala-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesEscala = [
  {
    path: "",
    component: EscalaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: EscalaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: EscalaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: EscalaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: EscalaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesEscala)]
  ],
  exports: [RouterModule]
})

export class EscalaModule { }
