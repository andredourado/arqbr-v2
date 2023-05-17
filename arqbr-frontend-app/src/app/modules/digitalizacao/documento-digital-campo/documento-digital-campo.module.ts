import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocumentoDigitalCampoListComponent } from 'src/app/pages/digitalizacao/documento-digital-campo/documento-digital-campo-list/documento-digital-campo-list.component'
import { DocumentoDigitalCampoEditComponent } from 'src/app/pages/digitalizacao/documento-digital-campo/documento-digital-campo-edit/documento-digital-campo-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesDocumentoDigitalCampo = [
  {
    path: "",
    component: DocumentoDigitalCampoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: DocumentoDigitalCampoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: DocumentoDigitalCampoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: DocumentoDigitalCampoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: DocumentoDigitalCampoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesDocumentoDigitalCampo)]
  ],
  exports: [RouterModule]
})

export class DocumentoDigitalCampoModule { }
