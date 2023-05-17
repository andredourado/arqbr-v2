import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { PessoaInterface } from 'src/app/interfaces/pessoas/pessoa'

@Component({
  selector: "app-pessoa-edit",
  templateUrl: "./pessoa-edit.component.html",
  styleUrls: ["./pessoa-edit.component.scss"],
})
export class PessoaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  pessoaForm = this.formBuilder.group({
    unidadeId: null,
    nome: '',
    email: '',
    funcaoId: null,
    gerente: false,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/pessoas`
  public unidadeIdService = `${environment.baseUrl}/unidades/select`
  public funcaoIdService = `${environment.baseUrl}/funcoes/select`

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
            if (this.pessoaForm.valid) {
              this.save(this.pessoaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.pessoaForm.valid) {
              this.saveAndNew(this.pessoaForm.value)
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
      this.subscriptions.add(this.getPessoa(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPessoa(id: string) {
    this.restService
      .get(`/pessoas/${id}`)
      .subscribe({
        next: (result) => {
          this.pessoaForm.patchValue({
            unidadeId: result.unidadeId,
            nome: result.nome,
            email: result.email,
            funcaoId: result.funcaoId,
            gerente: result.gerente,
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
          .put(`/pessoas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["pessoas"])
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
          .post("/pessoas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["pessoas"])
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
          .put(`/pessoas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.pessoaForm.reset()
              this.router.navigate(["pessoas/new"])
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
          .post("/pessoas", data)
          .subscribe({
            next: () => {
              this.pessoaForm.reset()
              this.router.navigate(["pessoas/new"])
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
    this.pessoaForm.controls.unidadeId.markAsDirty()
    this.pessoaForm.controls.nome.markAsDirty()
    this.pessoaForm.controls.funcaoId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["pessoas"])
  }
}
