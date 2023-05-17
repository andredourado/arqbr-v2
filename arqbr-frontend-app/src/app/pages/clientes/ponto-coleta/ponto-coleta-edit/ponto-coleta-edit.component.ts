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
  selector: "app-ponto-coleta-edit",
  templateUrl: "./ponto-coleta-edit.component.html",
  styleUrls: ["./ponto-coleta-edit.component.scss"],
})
export class PontoColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public estadoId = ''
  public result: any
  public literals: any = {}

  pontoColetaForm = this.formBuilder.group({
    clienteId: null,
    descricao: '',
    estadoId: null,
    cidadeId: null,
    endereco: '',
    numero: '',
    complemento: '',
    pessoaContatoNome: '',
    pessoaContatoCelular: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/pontos-coleta`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public estadoIdService = `${environment.baseUrl}/estados/select`
  public cidadeIdService = `${environment.baseUrl}/cidades/select`

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
      this.subscriptions.add(this.getPontoColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'clientes', options: 'pontoColeta'})
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
        action: () => this.save(this.pontoColetaForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.pontoColetaForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getPontoColeta(id: string) {
    this.restService
      .get(`/pontos-coleta/${id}`)
      .subscribe({
        next: (result) => {
          this.estadoId = result.estadoId
          this.pontoColetaForm.patchValue({
            clienteId: result.clienteId,
            descricao: result.descricao,
            estadoId: result.estadoId,
            cidadeId: result.cidadeId,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
            pessoaContatoNome: result.pessoaContatoNome,
            pessoaContatoCelular: result.pessoaContatoCelular,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  estadoIdChange(event: string) {
    this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.pontoColetaForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/pontos-coleta/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.pontoColetaForm.reset()
                  this.router.navigate(["pontos-coleta/new"])
                } else {
                  this.router.navigate(["pontos-coleta"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/pontos-coleta", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.pontoColetaForm.reset()
                  this.router.navigate(["pontos-coleta/new"])
                } else {
                  this.router.navigate(["pontos-coleta"])
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
    this.pontoColetaForm.controls.clienteId.markAsDirty()
    this.pontoColetaForm.controls.descricao.markAsDirty()
    this.pontoColetaForm.controls.estadoId.markAsDirty()
    this.pontoColetaForm.controls.cidadeId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["pontos-coleta"])
  }
}
