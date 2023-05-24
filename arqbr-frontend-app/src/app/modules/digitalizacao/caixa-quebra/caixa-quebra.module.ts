import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CaixaQuebraListComponent } from 'src/app/pages/digitalizacao/caixa-quebra/caixa-quebra-list/caixa-quebra-list.component'
import { CaixaQuebraEditComponent } from 'src/app/pages/digitalizacao/caixa-quebra/caixa-quebra-edit/caixa-quebra-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCaixaQuebra = [
  {
    path: "",
    component: CaixaQuebraListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CaixaQuebraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CaixaQuebraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CaixaQuebraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CaixaQuebraEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCaixaQuebra)]
  ],
  exports: [RouterModule]
})

export class CaixaQuebraModule { }
