import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TimeColetaListComponent } from 'src/app/pages/coleta/time-coleta/time-coleta-list/time-coleta-list.component'
import { TimeColetaEditComponent } from 'src/app/pages/coleta/time-coleta/time-coleta-edit/time-coleta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesTimeColeta = [
  {
    path: "",
    component: TimeColetaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: TimeColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: TimeColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TimeColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: TimeColetaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesTimeColeta)]
  ],
  exports: [RouterModule]
})

export class TimeColetaModule { }
