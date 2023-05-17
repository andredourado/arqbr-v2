import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { PosicaoInterface } from 'src/app/interfaces/armazenamento/posicao'

@Component({
  selector: "app-posicao-edit",
  templateUrl: "./posicao-edit.component.html",
  styleUrls: ["./posicao-edit.component.scss"],
})
export class PosicaoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public unidadeId = ''
  public result: any

  posicaoForm = this.formBuilder.group({
    unidadeId: null,
    plantaId: null,
    rua: '',
    linha: '',
    coluna: '',
    posicoes: 0,
    posicoesDisponíveis: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/posicoes`
  public unidadeIdService = `${environment.baseUrl}/unidades/select`
  public plantaIdService = `${environment.baseUrl}/plantas/select`

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
            if (this.posicaoForm.valid) {
              this.save(this.posicaoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.posicaoForm.valid) {
              this.saveAndNew(this.posicaoForm.value)
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
      this.subscriptions.add(this.getPosicao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPosicao(id: string) {
    this.restService
      .get(`/posicoes/${id}`)
      .subscribe({
        next: (result) => {
          this.unidadeId = result.unidadeId
          this.posicaoForm.patchValue({
            unidadeId: result.unidadeId,
            plantaId: result.plantaId,
            rua: result.rua,
            linha: result.linha,
            coluna: result.coluna,
            posicoes: result.posicoes,
            posicoesDisponíveis: result.posicoesDisponíveis,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  unidadeIdChange(event: string) {
    this.plantaIdService = `${environment.baseUrl}/plantas/select?unidadeId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/posicoes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["posicoes"])
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
          .post("/posicoes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["posicoes"])
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
          .put(`/posicoes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.posicaoForm.reset()
              this.router.navigate(["posicoes/new"])
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
          .post("/posicoes", data)
          .subscribe({
            next: () => {
              this.posicaoForm.reset()
              this.router.navigate(["posicoes/new"])
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
    this.posicaoForm.controls.unidadeId.markAsDirty()
    this.posicaoForm.controls.plantaId.markAsDirty()
    this.posicaoForm.controls.rua.markAsDirty()
    this.posicaoForm.controls.linha.markAsDirty()
    this.posicaoForm.controls.coluna.markAsDirty()
    this.posicaoForm.controls.posicoes.markAsDirty()
    this.posicaoForm.controls.posicoesDisponíveis.markAsDirty()
  }

  goBack() {
    this.router.navigate(["posicoes"])
  }
}
