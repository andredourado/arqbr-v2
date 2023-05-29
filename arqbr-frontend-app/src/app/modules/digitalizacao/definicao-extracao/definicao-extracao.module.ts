import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DefinicaoExtracaoEditComponent } from 'src/app/pages/digitalizacao/definicao-extracao/definicao-extracao-edit/definicao-extracao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesDefinicaoExtracao = [
  {
    path: "",
    component: DefinicaoExtracaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: DefinicaoExtracaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: DefinicaoExtracaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: DefinicaoExtracaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: DefinicaoExtracaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesDefinicaoExtracao)]
  ],
  exports: [RouterModule]
})

export class DefinicaoExtracaoModule { }
