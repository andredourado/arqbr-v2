import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { FrequenciaInterface } from 'src/app/interfaces/comum/frequencia'

@Component({
  selector: "app-frequencia-edit",
  templateUrl: "./frequencia-edit.component.html",
  styleUrls: ["./frequencia-edit.component.scss"],
})
export class FrequenciaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  frequenciaForm = this.formBuilder.group({
    descricao: '',
    espacoEmDias: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/frequencias`

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
            if (this.frequenciaForm.valid) {
              this.save(this.frequenciaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.frequenciaForm.valid) {
              this.saveAndNew(this.frequenciaForm.value)
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
      this.subscriptions.add(this.getFrequencia(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getFrequencia(id: string) {
    this.restService
      .get(`/frequencias/${id}`)
      .subscribe({
        next: (result) => {
          this.frequenciaForm.patchValue({
            descricao: result.descricao,
            espacoEmDias: result.espacoEmDias,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/frequencias/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["frequencias"])
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
          .post("/frequencias", data)
          .subscribe({
            next: () => {
              this.router.navigate(["frequencias"])
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
          .put(`/frequencias/${this.id}`, data)
          .subscribe({
            next: () => {
              this.frequenciaForm.reset()
              this.router.navigate(["frequencias/new"])
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
          .post("/frequencias", data)
          .subscribe({
            next: () => {
              this.frequenciaForm.reset()
              this.router.navigate(["frequencias/new"])
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
    this.frequenciaForm.controls.descricao.markAsDirty()
    this.frequenciaForm.controls.espacoEmDias.markAsDirty()
  }

  goBack() {
    this.router.navigate(["frequencias"])
  }
}
