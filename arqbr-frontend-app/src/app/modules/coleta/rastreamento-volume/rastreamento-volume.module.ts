import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { RastreamentoVolumeListComponent } from 'src/app/pages/coleta/rastreamento-volume/rastreamento-volume-list/rastreamento-volume-list.component'
import { RastreamentoVolumeEditComponent } from 'src/app/pages/coleta/rastreamento-volume/rastreamento-volume-edit/rastreamento-volume-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesRastreamentoVolume = [
  {
    path: "",
    component: RastreamentoVolumeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: RastreamentoVolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: RastreamentoVolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: RastreamentoVolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: RastreamentoVolumeEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesRastreamentoVolume)]
  ],
  exports: [RouterModule]
})

export class RastreamentoVolumeModule { }
