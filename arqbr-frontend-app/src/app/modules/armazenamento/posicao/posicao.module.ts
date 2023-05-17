import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PosicaoListComponent } from 'src/app/pages/armazenamento/posicao/posicao-list/posicao-list.component'
import { PosicaoEditComponent } from 'src/app/pages/armazenamento/posicao/posicao-edit/posicao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPosicao = [
  {
    path: "",
    component: PosicaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PosicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PosicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PosicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PosicaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPosicao)]
  ],
  exports: [RouterModule]
})

export class PosicaoModule { }
