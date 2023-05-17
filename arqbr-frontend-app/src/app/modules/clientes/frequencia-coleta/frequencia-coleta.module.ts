import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FrequenciaColetaListComponent } from 'src/app/pages/clientes/frequencia-coleta/frequencia-coleta-list/frequencia-coleta-list.component'
import { FrequenciaColetaEditComponent } from 'src/app/pages/clientes/frequencia-coleta/frequencia-coleta-edit/frequencia-coleta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesFrequenciaColeta = [
  {
    path: "",
    component: FrequenciaColetaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: FrequenciaColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: FrequenciaColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: FrequenciaColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: FrequenciaColetaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesFrequenciaColeta)]
  ],
  exports: [RouterModule]
})

export class FrequenciaColetaModule { }
