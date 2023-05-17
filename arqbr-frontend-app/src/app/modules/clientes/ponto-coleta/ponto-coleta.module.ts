import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PontoColetaListComponent } from 'src/app/pages/clientes/ponto-coleta/ponto-coleta-list/ponto-coleta-list.component'
import { PontoColetaEditComponent } from 'src/app/pages/clientes/ponto-coleta/ponto-coleta-edit/ponto-coleta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPontoColeta = [
  {
    path: "",
    component: PontoColetaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PontoColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PontoColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PontoColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PontoColetaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPontoColeta)]
  ],
  exports: [RouterModule]
})

export class PontoColetaModule { }
