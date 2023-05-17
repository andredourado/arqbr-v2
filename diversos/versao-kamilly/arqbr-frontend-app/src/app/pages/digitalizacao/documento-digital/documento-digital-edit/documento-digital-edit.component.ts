import { HttpClient } from '@angular/common/http'

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoUploadComponent, PoPageSlideComponent } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DomSanitizer } from "@angular/platform-browser"

const ZOOM_STEP: number = 0.25;
const DEFAULT_ZOOM: number = 1.4;

@Component({
  selector: "app-documento-digital-edit",
  templateUrl: "./documento-digital-edit.component.html",
  styleUrls: ["./documento-digital-edit.component.scss"],
})
export class DocumentoDigitalEditComponent implements OnInit, OnDestroy {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;

  public id: string
  public readonly = false
  public result: any
  public pdf: string


  url: string = 'http://localhost:3333/addFile'
  public pdfZoom: number = DEFAULT_ZOOM;
  input: number = 50;
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  @ViewChild('upload', { static: true }) upload!: PoUploadComponent;
  project: any = null
  src: string | unknown = '../../../../assets/pdf/muitas-paginas.pdf';

  private toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async changeUpload(e: any = null) {
    console.log(e)
    const file = e[0].rawFile;
    const toBase64 = await this.toBase64(file);
    this.src = toBase64;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  change() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages
    }
  }
  public openPage() {
    this.pageSlide.open();
  }

  public closePage() {
    this.pageSlide.close();
  }

  nextPage() {
    this.page++;
  }

  next50Page() {
    if ((this.totalPages - this.page) > this.input) {
      this.page += this.input;
    } else {
      this.page = this.totalPages;
    }
  }

  prevPage() {
    this.page--;
  }

  prev50Page() {
    if (this.page > this.input) {
      this.page -= this.input;
    } else {
      this.page = 1;
    }
  }

  public zoomIn() {
    this.pdfZoom += ZOOM_STEP;
  }

  public zoomOut() {
    this.pdfZoom -= ZOOM_STEP;
  }

  public resetZoom() {
    this.pdfZoom = DEFAULT_ZOOM;
  }


  

  formDocument = this.formBuilder.group({
    nip: '',
    matricula: '',
    declarante: '',
    ano_calendario: '',
    temporalidade: '',
    caixa_arqbr: '',
    paginas: '',
    tamanho: '',
    data_insercao: '',
  })

  formFilter = this.formBuilder.group({
    nip: '',
    matricula: '',
    declarante: '',
    ano_calendario: '',
    palavra_chave: '',
  })






  campoDocumentoForm = this.formBuilder.group({
    versaoDocumentoId: null,
    nomeCampo: '',
    identificador: '',
    cantoSuperiorX: 0,
    cantoSuperiorY: 0,
    cantoInferiorX: 0,
    cantoInferiorY: 0,
    conteudoParaValidacao: '',
    pessoaId: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/documentos-digitais`
  public versaoDocumentoIdService = `${environment.baseUrl}/versoes-documento/select`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`

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
    private poNotification: PoNotificationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    const pdf = this.activatedRoute.snapshot.paramMap.get("id")
    // this.src = {
    //   url: this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}/pdf/${pdf}`),
    //   withCredentials: true
    // }
    this.httpClient.get(`${environment.baseUrl}/pdf/${pdf}`).subscribe({
      next: res => console.log(res)
    })

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
            if (this.campoDocumentoForm.valid) {
              this.save(this.campoDocumentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.campoDocumentoForm.valid) {
              this.saveAndNew(this.campoDocumentoForm.value)
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
      this.subscriptions.add(this.getCampoDocumento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCampoDocumento(id: string) {
    this.restService
      .get(`/documentos-digitais/${id}`)
      .subscribe({
        next: (result) => {
          this.campoDocumentoForm.patchValue({
            versaoDocumentoId: result.versaoDocumentoId,
            nomeCampo: result.nomeCampo,
            identificador: result.identificador,
            cantoSuperiorX: result.cantoSuperiorX,
            cantoSuperiorY: result.cantoSuperiorY,
            cantoInferiorX: result.cantoInferiorX,
            cantoInferiorY: result.cantoInferiorY,
            conteudoParaValidacao: result.conteudoParaValidacao,
            pessoaId: result.pessoaId,
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
          .put(`/documentos-digitais/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos-digitais"])
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
          .post("/documentos-digitais", data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos-digitais"])
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
          .put(`/documentos-digitais/${this.id}`, data)
          .subscribe({
            next: () => {
              this.campoDocumentoForm.reset()
              this.router.navigate(["documentos-digitais/new"])
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
          .post("/documentos-digitais", data)
          .subscribe({
            next: () => {
              this.campoDocumentoForm.reset()
              this.router.navigate(["documentos-digitais/new"])
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
    this.campoDocumentoForm.controls.versaoDocumentoId.markAsDirty()
    this.campoDocumentoForm.controls.nomeCampo.markAsDirty()
    this.campoDocumentoForm.controls.identificador.markAsDirty()
    this.campoDocumentoForm.controls.pessoaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["documentos-digitais"])
  }
}
