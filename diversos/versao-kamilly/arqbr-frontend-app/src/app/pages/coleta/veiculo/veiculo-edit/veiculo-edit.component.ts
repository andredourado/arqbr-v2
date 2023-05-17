import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { VeiculoInterface } from 'src/app/interfaces/coleta/veiculo'

@Component({
  selector: "app-veiculo-edit",
  templateUrl: "./veiculo-edit.component.html",
  styleUrls: ["./veiculo-edit.component.scss"],
})
export class VeiculoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  veiculoForm = this.formBuilder.group({
    descricao: '',
    capacidade: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/veiculos`

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
            if (this.veiculoForm.valid) {
              this.save(this.veiculoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.veiculoForm.valid) {
              this.saveAndNew(this.veiculoForm.value)
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
      this.subscriptions.add(this.getVeiculo(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getVeiculo(id: string) {
    this.restService
      .get(`/veiculos/${id}`)
      .subscribe({
        next: (result) => {
          this.veiculoForm.patchValue({
            descricao: result.descricao,
            capacidade: result.capacidade,
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
          .put(`/veiculos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["veiculos"])
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
          .post("/veiculos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["veiculos"])
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
          .put(`/veiculos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.veiculoForm.reset()
              this.router.navigate(["veiculos/new"])
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
          .post("/veiculos", data)
          .subscribe({
            next: () => {
              this.veiculoForm.reset()
              this.router.navigate(["veiculos/new"])
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
    this.veiculoForm.controls.descricao.markAsDirty()
    this.veiculoForm.controls.capacidade.markAsDirty()
  }

  goBack() {
    this.router.navigate(["veiculos"])
  }
}
