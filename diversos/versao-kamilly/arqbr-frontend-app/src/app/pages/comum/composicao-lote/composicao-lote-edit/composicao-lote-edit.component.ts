import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ComposicaoLoteInterface } from 'src/app/interfaces/comum/composicao-lote'

@Component({
  selector: "app-composicao-lote-edit",
  templateUrl: "./composicao-lote-edit.component.html",
  styleUrls: ["./composicao-lote-edit.component.scss"],
})
export class ComposicaoLoteEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  composicaoLoteForm = this.formBuilder.group({
    descricao: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/composicao-lotes`

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
            if (this.composicaoLoteForm.valid) {
              this.save(this.composicaoLoteForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.composicaoLoteForm.valid) {
              this.saveAndNew(this.composicaoLoteForm.value)
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
      this.subscriptions.add(this.getComposicaoLote(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getComposicaoLote(id: string) {
    this.restService
      .get(`/composicao-lotes/${id}`)
      .subscribe({
        next: (result) => {
          this.composicaoLoteForm.patchValue({
            descricao: result.descricao,
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
          .put(`/composicao-lotes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["composicao-lotes"])
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
          .post("/composicao-lotes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["composicao-lotes"])
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
          .put(`/composicao-lotes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.composicaoLoteForm.reset()
              this.router.navigate(["composicao-lotes/new"])
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
          .post("/composicao-lotes", data)
          .subscribe({
            next: () => {
              this.composicaoLoteForm.reset()
              this.router.navigate(["composicao-lotes/new"])
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
    this.composicaoLoteForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["composicao-lotes"])
  }
}
