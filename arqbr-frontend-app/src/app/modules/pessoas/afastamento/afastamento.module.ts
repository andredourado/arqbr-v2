import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AfastamentoListComponent } from 'src/app/pages/pessoas/afastamento/afastamento-list/afastamento-list.component'
import { AfastamentoEditComponent } from 'src/app/pages/pessoas/afastamento/afastamento-edit/afastamento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesAfastamento = [
  {
    path: "",
    component: AfastamentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: AfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: AfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: AfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: AfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesAfastamento)]
  ],
  exports: [RouterModule]
})

export class AfastamentoModule { }
