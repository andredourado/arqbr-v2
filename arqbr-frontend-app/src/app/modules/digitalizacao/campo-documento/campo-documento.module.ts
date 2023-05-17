import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CampoDocumentoListComponent } from 'src/app/pages/digitalizacao/campo-documento/campo-documento-list/campo-documento-list.component'
import { CampoDocumentoEditComponent } from 'src/app/pages/digitalizacao/campo-documento/campo-documento-edit/campo-documento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCampoDocumento = [
  {
    path: "",
    component: CampoDocumentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CampoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CampoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CampoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CampoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCampoDocumento)]
  ],
  exports: [RouterModule]
})

export class CampoDocumentoModule { }
