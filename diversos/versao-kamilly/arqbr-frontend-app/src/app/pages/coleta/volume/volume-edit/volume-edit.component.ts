import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { VolumeInterface } from 'src/app/interfaces/coleta/volume'

@Component({
  selector: "app-volume-edit",
  templateUrl: "./volume-edit.component.html",
  styleUrls: ["./volume-edit.component.scss"],
})
export class VolumeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  volumeForm = this.formBuilder.group({
    coletaId: null,
    identificador: '',
    arquivoFoto: '',
    comentario: '',
    localDeArmazenagem: null,
    statusId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/volumes`
  public coletaIdService = `${environment.baseUrl}/coletas/select`
  public localDeArmazenagemService = `${environment.baseUrl}/plantas/select`
  public statusIdService = `${environment.baseUrl}/status/select`

  subscriptions = new Subscription()

  public formErrorNotification: PoNotification = {
    message: "Formulário precisa ser preenchido corretamente.",
    duration: 4000,
  }

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    if (this.activatedRoute.snapshot.routeConfig.path.slice(-8) === 'view/:id') {
      this.readonly = true

      this.pageActions.push(
        {
          label: "Fechar",
          action: this.goBack.bind(this),
        }
      )
    } else {
      this.pageActions.push(
        {
          label: "Salvar",
          action: () => {
            if (this.volumeForm.valid) {
              this.save(this.volumeForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.volumeForm.valid) {
              this.saveAndNew(this.volumeForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Cancelar",
          action: this.goBack.bind(this),
        }
      )
    }

    if (this.id) {
      this.subscriptions.add(this.getVolume(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getVolume(id: string) {
    this.restService
      .get(`/volumes/${id}`)
      .subscribe({
        next: (result) => {
          this.volumeForm.patchValue({
            coletaId: result.coletaId,
            identificador: result.identificador,
            arquivoFoto: result.arquivoFoto,
            comentario: result.comentario,
            localDeArmazenagem: result.localDeArmazenagem,
            statusId: result.statusId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/volumes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["volumes"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
    } else {
      this.subscriptions.add(
        this.restService
          .post("/volumes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["volumes"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
    }
  }

  saveAndNew(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/volumes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.volumeForm.reset()
              this.router.navigate(["volumes/new"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
    } else {
      this.subscriptions.add(
        this.restService
          .post("/volumes", data)
          .subscribe({
            next: () => {
              this.volumeForm.reset()
              this.router.navigate(["volumes/new"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
    }
  }

  markAsDirty() {
    this.volumeForm.controls.coletaId.markAsDirty()
    this.volumeForm.controls.arquivoFoto.markAsDirty()
    this.volumeForm.controls.comentario.markAsDirty()
  }

  goBack() {
    this.router.navigate(["volumes"])
  }
}
