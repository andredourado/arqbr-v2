import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SolicitanteListComponent } from 'src/app/pages/clientes/solicitante/solicitante-list/solicitante-list.component'
import { SolicitanteEditComponent } from 'src/app/pages/clientes/solicitante/solicitante-edit/solicitante-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesSolicitante = [
  {
    path: "",
    component: SolicitanteListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: SolicitanteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: SolicitanteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: SolicitanteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: SolicitanteEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesSolicitante)]
  ],
  exports: [RouterModule]
})

export class SolicitanteModule { }
