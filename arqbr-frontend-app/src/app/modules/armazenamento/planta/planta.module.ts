import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlantaListComponent } from 'src/app/pages/armazenamento/planta/planta-list/planta-list.component'
import { PlantaEditComponent } from 'src/app/pages/armazenamento/planta/planta-edit/planta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPlanta = [
  {
    path: "",
    component: PlantaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PlantaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PlantaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PlantaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PlantaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPlanta)]
  ],
  exports: [RouterModule]
})

export class PlantaModule { }
