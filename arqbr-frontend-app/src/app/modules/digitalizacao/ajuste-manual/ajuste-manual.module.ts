import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AjusteManualEditComponent } from 'src/app/pages/digitalizacao/ajuste-manual/ajuste-manual-edit/ajuste-manual-edit.component'
import { AjusteManualListComponent } from 'src/app/pages/digitalizacao/ajuste-manual/ajuste-manual-list/ajuste-manual-list.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesAjusteManual = [
  {
    path: "",
    component: AjusteManualListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: AjusteManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: AjusteManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: AjusteManualEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: AjusteManualEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesAjusteManual)]
  ],
  exports: [RouterModule]
})

export class AjusteManualModule { }
