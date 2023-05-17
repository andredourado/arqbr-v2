import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PessoaListComponent } from 'src/app/pages/pessoas/pessoa/pessoa-list/pessoa-list.component'
import { PessoaEditComponent } from 'src/app/pages/pessoas/pessoa/pessoa-edit/pessoa-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPessoa = [
  {
    path: "",
    component: PessoaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PessoaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PessoaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PessoaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PessoaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPessoa)]
  ],
  exports: [RouterModule]
})

export class PessoaModule { }
