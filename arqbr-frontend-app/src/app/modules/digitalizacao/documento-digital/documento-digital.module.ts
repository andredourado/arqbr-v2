import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocumentoDigitalListComponent } from 'src/app/pages/digitalizacao/documento-digital/documento-digital-list/documento-digital-list.component'
import { DocumentoDigitalEditComponent } from 'src/app/pages/digitalizacao/documento-digital/documento-digital-edit/documento-digital-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesDocumentoDigital = [
  {
    path: "",
    component: DocumentoDigitalListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: DocumentoDigitalEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: DocumentoDigitalEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: DocumentoDigitalEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: DocumentoDigitalEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesDocumentoDigital)]
  ],
  exports: [RouterModule]
})

export class DocumentoDigitalModule { }
