import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { FuncaoInterface } from 'src/app/interfaces/pessoas/funcao'

@Component({
  selector: "app-funcao-edit",
  templateUrl: "./funcao-edit.component.html",
  styleUrls: ["./funcao-edit.component.scss"],
})
export class FuncaoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  funcaoForm = this.formBuilder.group({
    descricao: '',
    metaProducao: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/funcoes`

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
            if (this.funcaoForm.valid) {
              this.save(this.funcaoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.funcaoForm.valid) {
              this.saveAndNew(this.funcaoForm.value)
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
      this.subscriptions.add(this.getFuncao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getFuncao(id: string) {
    this.restService
      .get(`/funcoes/${id}`)
      .subscribe({
        next: (result) => {
          this.funcaoForm.patchValue({
            descricao: result.descricao,
            metaProducao: result.metaProducao,
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
          .put(`/funcoes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["funcoes"])
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
          .post("/funcoes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["funcoes"])
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
          .put(`/funcoes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.funcaoForm.reset()
              this.router.navigate(["funcoes/new"])
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
          .post("/funcoes", data)
          .subscribe({
            next: () => {
              this.funcaoForm.reset()
              this.router.navigate(["funcoes/new"])
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
    this.funcaoForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["funcoes"])
  }
}
