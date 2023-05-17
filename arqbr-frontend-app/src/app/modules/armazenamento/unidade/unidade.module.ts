import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UnidadeListComponent } from 'src/app/pages/armazenamento/unidade/unidade-list/unidade-list.component'
import { UnidadeEditComponent } from 'src/app/pages/armazenamento/unidade/unidade-edit/unidade-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesUnidade = [
  {
    path: "",
    component: UnidadeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: UnidadeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: UnidadeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: UnidadeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: UnidadeEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesUnidade)]
  ],
  exports: [RouterModule]
})

export class UnidadeModule { }
