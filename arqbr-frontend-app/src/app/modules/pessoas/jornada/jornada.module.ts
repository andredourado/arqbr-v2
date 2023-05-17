import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { JornadaListComponent } from 'src/app/pages/pessoas/jornada/jornada-list/jornada-list.component'
import { JornadaEditComponent } from 'src/app/pages/pessoas/jornada/jornada-edit/jornada-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesJornada = [
  {
    path: "",
    component: JornadaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: JornadaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: JornadaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: JornadaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: JornadaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesJornada)]
  ],
  exports: [RouterModule]
})

export class JornadaModule { }
