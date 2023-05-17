import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EntregadorListComponent } from 'src/app/pages/coleta/entregador/entregador-list/entregador-list.component'
import { EntregadorEditComponent } from 'src/app/pages/coleta/entregador/entregador-edit/entregador-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesEntregador = [
  {
    path: "",
    component: EntregadorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: EntregadorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: EntregadorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: EntregadorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: EntregadorEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesEntregador)]
  ],
  exports: [RouterModule]
})

export class EntregadorModule { }
