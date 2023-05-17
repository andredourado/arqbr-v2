import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FuncaoListComponent } from 'src/app/pages/pessoas/funcao/funcao-list/funcao-list.component'
import { FuncaoEditComponent } from 'src/app/pages/pessoas/funcao/funcao-edit/funcao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesFuncao = [
  {
    path: "",
    component: FuncaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: FuncaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: FuncaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: FuncaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: FuncaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesFuncao)]
  ],
  exports: [RouterModule]
})

export class FuncaoModule { }
