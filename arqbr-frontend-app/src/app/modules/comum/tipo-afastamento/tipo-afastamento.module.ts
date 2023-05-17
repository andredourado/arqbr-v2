import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TipoAfastamentoListComponent } from 'src/app/pages/comum/tipo-afastamento/tipo-afastamento-list/tipo-afastamento-list.component'
import { TipoAfastamentoEditComponent } from 'src/app/pages/comum/tipo-afastamento/tipo-afastamento-edit/tipo-afastamento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesTipoAfastamento = [
  {
    path: "",
    component: TipoAfastamentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: TipoAfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: TipoAfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TipoAfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: TipoAfastamentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesTipoAfastamento)]
  ],
  exports: [RouterModule]
})

export class TipoAfastamentoModule { }
