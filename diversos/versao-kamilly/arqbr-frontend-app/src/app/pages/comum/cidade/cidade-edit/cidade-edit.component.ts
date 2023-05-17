import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { CidadeInterface } from 'src/app/interfaces/comum/cidade'

@Component({
  selector: "app-cidade-edit",
  templateUrl: "./cidade-edit.component.html",
  styleUrls: ["./cidade-edit.component.scss"],
})
export class CidadeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  cidadeForm = this.formBuilder.group({
    estadoId: null,
    nomeCidade: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/cidades`
  public estadoIdService = `${environment.baseUrl}/estados/select`

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
            if (this.cidadeForm.valid) {
              this.save(this.cidadeForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.cidadeForm.valid) {
              this.saveAndNew(this.cidadeForm.value)
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
      this.subscriptions.add(this.getCidade(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCidade(id: string) {
    this.restService
      .get(`/cidades/${id}`)
      .subscribe({
        next: (result) => {
          this.cidadeForm.patchValue({
            estadoId: result.estadoId,
            nomeCidade: result.nomeCidade,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/cidades/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["cidades"])
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
          .post("/cidades", data)
          .subscribe({
            next: () => {
              this.router.navigate(["cidades"])
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
          .put(`/cidades/${this.id}`, data)
          .subscribe({
            next: () => {
              this.cidadeForm.reset()
              this.router.navigate(["cidades/new"])
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
          .post("/cidades", data)
          .subscribe({
            next: () => {
              this.cidadeForm.reset()
              this.router.navigate(["cidades/new"])
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
    this.cidadeForm.controls.estadoId.markAsDirty()
    this.cidadeForm.controls.nomeCidade.markAsDirty()
  }

  goBack() {
    this.router.navigate(["cidades"])
  }
}
