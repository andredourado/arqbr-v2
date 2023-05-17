import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DepartamentoListComponent } from 'src/app/pages/clientes/departamento/departamento-list/departamento-list.component'
import { DepartamentoEditComponent } from 'src/app/pages/clientes/departamento/departamento-edit/departamento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesDepartamento = [
  {
    path: "",
    component: DepartamentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: DepartamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: DepartamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: DepartamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: DepartamentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesDepartamento)]
  ],
  exports: [RouterModule]
})

export class DepartamentoModule { }
