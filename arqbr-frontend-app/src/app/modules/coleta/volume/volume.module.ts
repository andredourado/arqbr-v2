import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { VolumeListComponent } from 'src/app/pages/coleta/volume/volume-list/volume-list.component'
import { VolumeEditComponent } from 'src/app/pages/coleta/volume/volume-edit/volume-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesVolume = [
  {
    path: "",
    component: VolumeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: VolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: VolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: VolumeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: VolumeEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesVolume)]
  ],
  exports: [RouterModule]
})

export class VolumeModule { }
