import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { VeiculoListComponent } from 'src/app/pages/coleta/veiculo/veiculo-list/veiculo-list.component'
import { VeiculoEditComponent } from 'src/app/pages/coleta/veiculo/veiculo-edit/veiculo-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesVeiculo = [
  {
    path: "",
    component: VeiculoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: VeiculoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: VeiculoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: VeiculoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: VeiculoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesVeiculo)]
  ],
  exports: [RouterModule]
})

export class VeiculoModule { }
