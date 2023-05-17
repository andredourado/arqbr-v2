import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

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
  public literals: any = {}

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

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private languagesService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getPosicao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'armazenamento', options: 'posicao'})
      .subscribe({
        next: res => this.literals = res
      })
  }

  getPageType(route: string): string {
    switch (route) {
      case 'new':
        return 'new'
      case 'new/:id':
        return 'new'
      case 'edit':
        return 'edit'
      case 'edit/:id':
        return 'edit'
      case 'view/:id':
        return 'view'
    }
  }

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: this.literals.return,
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: this.literals.save,
        action: () => this.save(this.posicaoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.posicaoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
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

  save(data, willCreateAnother?: boolean) {
    if (this.posicaoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/posicoes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.posicaoForm.reset()
                  this.router.navigate(["posicoes/new"])
                } else {
                  this.router.navigate(["posicoes"])
                }
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
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.posicaoForm.reset()
                  this.router.navigate(["posicoes/new"])
                } else {
                  this.router.navigate(["posicoes"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    } else {
      this.markAsDirty()
      this.poNotification.warning({
        message: this.literals.formError,
        duration: environment.poNotificationDuration
      })
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
