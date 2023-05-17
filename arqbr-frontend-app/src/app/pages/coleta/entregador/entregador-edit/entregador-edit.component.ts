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
  selector: "app-entregador-edit",
  templateUrl: "./entregador-edit.component.html",
  styleUrls: ["./entregador-edit.component.scss"],
})
export class EntregadorEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  entregadorForm = this.formBuilder.group({
    cpfCnpj: '',
    nome: '',
    email: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    telefonesFixos: '',
    celular: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/entregadores`

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
      this.subscriptions.add(this.getEntregador(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'coleta', options: 'entregador'})
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
        action: () => this.save(this.entregadorForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.entregadorForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getEntregador(id: string) {
    this.restService
      .get(`/entregadores/${id}`)
      .subscribe({
        next: (result) => {
          this.entregadorForm.patchValue({
            cpfCnpj: result.cpfCnpj,
            nome: result.nome,
            email: result.email,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
            cep: result.cep,
            telefonesFixos: result.telefonesFixos,
            celular: result.celular,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.entregadorForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/entregadores/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.entregadorForm.reset()
                  this.router.navigate(["entregadores/new"])
                } else {
                  this.router.navigate(["entregadores"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/entregadores", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.entregadorForm.reset()
                  this.router.navigate(["entregadores/new"])
                } else {
                  this.router.navigate(["entregadores"])
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
    this.entregadorForm.controls.cpfCnpj.markAsDirty()
    this.entregadorForm.controls.nome.markAsDirty()
    this.entregadorForm.controls.email.markAsDirty()
  }

  goBack() {
    this.router.navigate(["entregadores"])
  }
}
