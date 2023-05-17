import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TipoDocumentoListComponent } from 'src/app/pages/digitalizacao/tipo-documento/tipo-documento-list/tipo-documento-list.component'
import { TipoDocumentoEditComponent } from 'src/app/pages/digitalizacao/tipo-documento/tipo-documento-edit/tipo-documento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesTipoDocumento = [
  {
    path: "",
    component: TipoDocumentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: TipoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: TipoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TipoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: TipoDocumentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesTipoDocumento)]
  ],
  exports: [RouterModule]
})

export class TipoDocumentoModule { }
