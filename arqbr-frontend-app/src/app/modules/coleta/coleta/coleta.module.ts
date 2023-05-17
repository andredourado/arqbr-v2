import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ColetaListComponent } from 'src/app/pages/coleta/coleta/coleta-list/coleta-list.component'
import { ColetaEditComponent } from 'src/app/pages/coleta/coleta/coleta-edit/coleta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesColeta = [
  {
    path: "",
    component: ColetaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: ColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: ColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: ColetaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: ColetaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesColeta)]
  ],
  exports: [RouterModule]
})

export class ColetaModule { }
