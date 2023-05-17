import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ServicoContratadoListComponent } from 'src/app/pages/clientes/servico-contratado/servico-contratado-list/servico-contratado-list.component'
import { ServicoContratadoEditComponent } from 'src/app/pages/clientes/servico-contratado/servico-contratado-edit/servico-contratado-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesServicoContratado = [
  {
    path: "",
    component: ServicoContratadoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: ServicoContratadoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: ServicoContratadoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: ServicoContratadoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: ServicoContratadoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesServicoContratado)]
  ],
  exports: [RouterModule]
})

export class ServicoContratadoModule { }
