import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SugestaoListComponent } from 'src/app/pages/clientes/sugestao/sugestao-list/sugestao-list.component'
import { SugestaoEditComponent } from 'src/app/pages/clientes/sugestao/sugestao-edit/sugestao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesSugestao = [
  {
    path: "",
    component: SugestaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: SugestaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: SugestaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: SugestaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: SugestaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesSugestao)]
  ],
  exports: [RouterModule]
})

export class SugestaoModule { }
