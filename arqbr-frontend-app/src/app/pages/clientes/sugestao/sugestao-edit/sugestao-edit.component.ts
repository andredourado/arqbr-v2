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
  selector: "app-sugestao-edit",
  templateUrl: "./sugestao-edit.component.html",
  styleUrls: ["./sugestao-edit.component.scss"],
})
export class SugestaoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public departamentoId = ''
  public result: any
  public literals: any = {}

  sugestaoForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    solicitanteId: null,
    titulo: '',
    descricao: '',
    atendido: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/sugestoes`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public solicitanteIdService = `${environment.baseUrl}/solicitantes/select`

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
      this.subscriptions.add(this.getSugestao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'clientes', options: 'sugestao'})
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
        action: () => this.save(this.sugestaoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.sugestaoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getSugestao(id: string) {
    this.restService
      .get(`/sugestoes/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.departamentoId = result.departamentoId
          this.sugestaoForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            solicitanteId: result.solicitanteId,
            titulo: result.titulo,
            atendido: result.atendido,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
  }

  departamentoIdChange(event: string) {
    this.solicitanteIdService = `${environment.baseUrl}/solicitantes/select?departamentoId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.sugestaoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/sugestoes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.sugestaoForm.reset()
                  this.router.navigate(["sugestoes/new"])
                } else {
                  this.router.navigate(["sugestoes"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/sugestoes", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.sugestaoForm.reset()
                  this.router.navigate(["sugestoes/new"])
                } else {
                  this.router.navigate(["sugestoes"])
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
    this.sugestaoForm.controls.clienteId.markAsDirty()
    this.sugestaoForm.controls.departamentoId.markAsDirty()
    this.sugestaoForm.controls.solicitanteId.markAsDirty()
    this.sugestaoForm.controls.titulo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["sugestoes"])
  }
}
