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
  selector: "app-afastamento-edit",
  templateUrl: "./afastamento-edit.component.html",
  styleUrls: ["./afastamento-edit.component.scss"],
})
export class AfastamentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  afastamentoForm = this.formBuilder.group({
    pessoaId: null,
    tipoAfastamentoId: null,
    inicio: null,
    fim: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/afastamentos`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`
  public tipoAfastamentoIdService = `${environment.baseUrl}/tipos-afastamento/select`

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
      this.subscriptions.add(this.getAfastamento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'pessoas', options: 'afastamento'})
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
        action: () => this.save(this.afastamentoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.afastamentoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getAfastamento(id: string) {
    this.restService
      .get(`/afastamentos/${id}`)
      .subscribe({
        next: (result) => {
          this.afastamentoForm.patchValue({
            pessoaId: result.pessoaId,
            tipoAfastamentoId: result.tipoAfastamentoId,
            inicio: result.inicio ? result.inicio.substring(0, 10) : null,
            fim: result.fim ? result.fim.substring(0, 10) : null,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.afastamentoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/afastamentos/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.afastamentoForm.reset()
                  this.router.navigate(["afastamentos/new"])
                } else {
                  this.router.navigate(["afastamentos"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/afastamentos", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.afastamentoForm.reset()
                  this.router.navigate(["afastamentos/new"])
                } else {
                  this.router.navigate(["afastamentos"])
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
    this.afastamentoForm.controls.pessoaId.markAsDirty()
    this.afastamentoForm.controls.tipoAfastamentoId.markAsDirty()
    this.afastamentoForm.controls.inicio.markAsDirty()
    this.afastamentoForm.controls.fim.markAsDirty()
  }

  goBack() {
    this.router.navigate(["afastamentos"])
  }
}
