import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { QuebraManualEditComponent } from 'src/app/pages/digitalizacao/quebra-manual/quebra-manual-edit/quebra-manual-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesQuebraManual = [
  {
    path: "",
    component: QuebraManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: QuebraManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: QuebraManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: QuebraManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: QuebraManualEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesQuebraManual)]
  ],
  exports: [RouterModule]
})

export class QuebraManualModule { }
