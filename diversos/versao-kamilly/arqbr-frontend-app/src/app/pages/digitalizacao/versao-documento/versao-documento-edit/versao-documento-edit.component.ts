import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit, ViewChild, HostListener, resolveForwardRef } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoTableComponent, PoUploadComponent, PoUploadFileRestrictions } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { VersaoDocumentoInterface } from 'src/app/interfaces/digitalizacao/versao-documento'
import { v4 as uuidV4 } from 'uuid'

interface ICanvas {
  nativeElement: HTMLCanvasElement
}

interface IResponse {
  data: {
    id ?: string
    file ?: string
  }
}

type Square = {
  id ?: string,
  page?: number,
  name?: string, 
  startX: number, 
  startY: number,
  endX: number,
  endY: number,
}

type TextType = {
  id ?: string,
  page?: number,
  name?: string, 
  linha?: string,
  coluna?: string,
  resultadoEsperado?: string,
  complemento?: string,
  mascara?: string,
  comprimento?: number,
  ocorrencia?: string,
  referencia?: string,
  localizacao?: string,
}

@Component({
  selector: "app-versao-documento-edit",
  templateUrl: "./versao-documento-edit.component.html",
  styleUrls: ["./versao-documento-edit.component.scss"],
})
export class VersaoDocumentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any
  public isLoading = false
  
  public width: number = 800
  public height: number = 800
  public canvasF: HTMLCanvasElement
  public contextForeground: CanvasRenderingContext2D
  public uploadUrl = `${environment.baseUrl}/versoes-documento/file`
  public restrictions: PoUploadFileRestrictions = {
    allowedExtensions: [ '.csv', '.txt' ],
  }

  public paint: boolean
  public started: boolean = false
  public startX: number 
  public startY: number
  public endX: number
  public endY: number
  public squareWidth: number
  public squareHeight: number
  public squares: Square[] = []
  public fileImage: string
  public resume: any
  public file: any 
  public src: string
  public page: number
  public pageTotal: number = 1
  public pageIndex: number = 0
  public numberPages: number;

  public currentWidth: number
  public currentHeight: number

  public isFormDisabled = true
  public squareId: string
  
  private clickX: number[] = []
  private clickY: number[] = []
  private clickDrag: boolean[] = []

  public texts: TextType[] = []
  private textId: string

  public fileText = null

  changeText(texto: string) {
    console.log(texto)
    return texto
  }

  squaresForm = this.formBuilder.group({
    name: '',
    page: null,
    startX: 0, 
    startY: 0,
    endX: 0,
    endY: 0,
    imageWidth: 0,
    imageHeight: 0
  })
  
  textForm = this.formBuilder.group({
    name: '',
    page: null,
    linha: '',
    coluna: '',
    resultadoEsperado: '',
    complemento: '',
    mascara: '',
    comprimento: 0,
    ocorrencia: '',
    referencia: '',
    localizacao: '',
  })

  versaoDocumentoForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    descricaoVersao: '',
    qrcode: '',
    file: null,
    desabilitado: false,
    upload: null, 
  })

  public readonly serviceApi = `${environment.baseUrl}/versoes-documento`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`
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
  ) { }

  @ViewChild('canvasForeground', { static: true }) canvasForeground!: ICanvas
  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent 
  @ViewChild('upload', { static: true }) upload!:PoUploadComponent
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
            if (this.versaoDocumentoForm.valid && this.squares.length > 0) {
              this.save(this.versaoDocumentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.versaoDocumentoForm.valid && this.squares.length > 0) {
              this.saveAndNew(this.versaoDocumentoForm.value)
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
      this.subscriptions.add(this.getVersaoDocumento(this.id))
    }

    this.canvasF = this.canvasForeground.nativeElement
    this.contextForeground = this.canvasF.getContext("2d")

    this.lineSettings()
    this.onResize()
    this.createUserEvents()
    this.onClickPage()
    // this.resizeHeight()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
  getVersaoDocumento(id: string) {
    this.restService
      .get(`/versoes-documento/${id}`)
      .subscribe({
        next: async (result) => {
          this.clienteId = result.clienteId
          this.versaoDocumentoForm.patchValue({
            clienteId: result.data.clienteId,
            contratoId: result.data.contratoId,
            departamentoId: result.data.departamentoId,
            tipoDocumentoId: result.data.tipoDocumentoId,
            descricaoVersao: result.data.descricaoVersao,
            qrcode: result.data.qrcode,
            desabilitado: result.data.desabilitado,
          })
          this.src = `${environment.baseUrl}/images/${result.data.file.slice(0, -4)}/page0.png`;
          this.pageTotal = result.data.pageQuantity

          setTimeout(() => {
            this.squares = result.data.squares
            this.texts = result.data.texts
            this.clearCanvas()
            this.redrawSquares()
          }, 502)
          
        },
        error: (error) => console.log(error)
      })
    }
    
    clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }
  
  updateFileError() {
    this.isLoading = false
    this.poNotification.warning({
      message: 'Erro ao enviar arquivo',
      duration: environment.poNotificationDuration
    })
  }

  uploadSuccess(event) {
    const { page, file, text } = event.body.data
    // this.fileText = this.refactStringToHtml(text)
    this.fileText = `${environment.baseUrl}/images/${file.slice(0, -4)}/page0.txt`;
    this.getText(this.fileText)
    console.log(this.fileText)
    this.file = file; // atribui o valor de file à variável file definida anteriormente
    this.src = `${environment.baseUrl}/images/${file.slice(0, -4)}/page0.png`;
    this.pageTotal = page; // atualiza o número total de páginas
    this.squaresForm.patchValue({ page: 1 }) 
    this.isLoading = false
    
    this.textForm.patchValue({ page: 1 }) 
  }

  getText(url: string) {
    this.subscriptions.add(
      this.httpClient.get(url).subscribe({
        next: (response) => {
          console.log(response)
        }
      })
    )
  }

  // Responsavel pela paginação do Canvas
  onClickPage(pageIndex: number = 0) {
    this.page = pageIndex
    if (this.page >= 0 && this.page <= this.pageTotal) {
      if (this.file) {
        this.src = `${environment.baseUrl}/images/${this.file.slice(0, -4)}/page${this.page}.png`;
      }
      this.resetForm()
      this.squaresForm.patchValue({
        page: this.page + 1
      })
      this.clearCanvas()
      this.redrawSquares()
      this.calculateImageWidth(window.innerWidth)
    }
  }

  uploadFunction() {
    this.isLoading = true
  }

  uploadFile = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
      this.calculateImageWidth(window.innerWidth)
    }
    reader.onerror = error => reject(error)
  })

  lineSettings() {
    this.contextForeground.lineCap = 'round'
    this.contextForeground.lineJoin = 'round'
    this.contextForeground.strokeStyle = 'blue'
    this.contextForeground.fillStyle = 'rgba(225,225,225,0.5)'
    this.contextForeground.lineWidth = 1
  }

  createUserEvents() {
    this.canvasF.addEventListener("mousedown", this.pressEventHandler)
    this.canvasF.addEventListener("mousemove", this.dragEventHandler)
    this.canvasF.addEventListener("mouseup", this.releaseEventHandler)
    this.canvasF.addEventListener("mouseout", this.cancelEventHandler)
    this.canvasF.addEventListener("dblclick", this.dbclickEventHandler)
  }

  pressEventHandler = (e: MouseEvent) => {
    let mouseX = (e as MouseEvent).offsetX
    let mouseY = (e as MouseEvent).offsetY

    this.paint = true
    this.addClick(mouseX, mouseY)
    this.redraw()
  }

  dragEventHandler = (e: MouseEvent) => {
    let mouseX = (e as MouseEvent).offsetX;
    let mouseY = (e as MouseEvent).offsetY;

    if(this.paint && this.started) {
      if (!this.checkOverlap(this.squares, this.startX, this.startY, mouseX, mouseY)) {
        this.addClick(mouseX, mouseY)
        this.redraw()
      } else {
        this.paint = false
        this.started = false
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
      }
    }

    e.preventDefault()
  }

  releaseEventHandler = () => {
    if(this.started ) {
      const tmp: Square = {
        page: this.page,
        startX: this.startX, 
        startY: this.startY,
        endX: this.endX,
        endY: this.endY,
      }

      if (!((this.startX == this.endX) && (this.startY == this.endY))) {
        this.selectSquare(tmp)
      }
      this.redraw()
    }

    this.paint = false
    this.started = false
  }

  cancelEventHandler = () => {
    this.paint = false
  }

  dbclickEventHandler = (e: MouseEvent) => {
    let mouseX = (e as MouseEvent).offsetX
    let mouseY = (e as MouseEvent).offsetY
    const squareId = this.identifySquare(this.squares, mouseX, mouseY)
    const square = this.squares[squareId]

    if (squareId != -1){
      this.selectSquare(this.squares[squareId])
    }
  }

  redrawSquares() {
    const context = this.contextForeground

    this.squares.filter(square => square.page === this.page).map((square: Square) => {
      context.beginPath()
      context.rect(square.startX, square.startY, square.endX - square.startX, square.endY - square.startY)
      context.fillRect(square.startX, square.startY, square.endX - square.startX, square.endY - square.startY)
      context.stroke()
      context.closePath()
    })
  }

  redraw() {
    let context = this.contextForeground

    this.clearCanvas()
    this.redrawSquares()
    context.beginPath()
    context.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
    context.fillRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
    context.stroke()
    context.closePath()
  }

  addClick(x: number, y: number) {
    if (!this.started) {
      this.startX = x
      this.startY = y
      this.endX = x
      this.endY = y
      this.started = true
    } else {
      this.endX = x
      this.endY = y
    }
  }

  clearCanvas() {
    this.contextForeground
        .clearRect(0, 0, this.canvasF.width, this.canvasF.height)
    this.clickX = []
    this.clickY = []
    this.clickDrag =[]
  }

  alreadyTaken = (square: Square, startX: number, startY: number, endX: number, endY: number) => {
    const squareLeft = Math.min(square.startX, square.endX)
    const squareRight = Math.max(square.startX, square.endX)
    const squareBottom = Math.min(square.startY, square.endY)
    const squareTop = Math.max(square.startY, square.endY)
  
    const newSquareLeft = Math.min(startX, endX)
    const newSquareRight = Math.max(startX, endX)
    const newSquareBottom = Math.min(startY, endY)
    const newSquareTop = Math.max(startY, endY)
  
    const vertical = Math.max(newSquareBottom, squareBottom) < Math.min(newSquareTop, squareTop)
    const horizontal = Math.max(newSquareLeft, squareLeft) < Math.min(newSquareRight, squareRight)
  
    return vertical && horizontal
  }

  checkOverlap = (squares: Square[], startX: number, startY: number, endX: number, endY: number) => {
    let isTaken = false
  
    squares.map((square: Square) => {
      const isAlreadyTaken = this.alreadyTaken(square, startX, startY, endX, endY)
      if(isAlreadyTaken && square.page === this.page) {
        isTaken = true
      }
    })
  
    return isTaken
  }

  isIdentified = (square: Square, x: number, y: number) => {
    const testX = ((x >= square.startX) && (x <= square.endX))
    const testY = ((y >= square.startY) && (y <= square.endY))
  
    return testX && testY
  }

  identifySquare = (squares: Square[], startX: number, startY: number) => {
    let index = -1
    for (let i = 0; i < squares.length; i++) {
      const identified = this.isIdentified(squares[i], startX, startY)
  
      if(identified) {
        index = i
      }
    }
  
    return index
  }

  selectSquare(square: Square) {
    this.isFormDisabled = false
    this.squaresForm.patchValue({
      name: square.name,
      page: square.page + 1,
      startX: square.startX, 
      startY: square.startY, 
      endX: square.endX, 
      endY: square.endY,
      imageWidth: Math.round(this.width),
      imageHeight: Math.round(this.height)
    })
    
    this.page = square.page
    // this.src = "assets/pages/page" + square.page + ".png" 
    this.clearCanvas()
    this.redrawSquares()

    this.squareId = square.id
  }

  tableTextClick(index: number) {
    this.textForm.patchValue({
      name: this.texts[index].name,
      page: this.texts[index].page + 1,
      linha: this.texts[index].linha,
      coluna: this.texts[index].coluna,
      resultadoEsperado: this.texts[index].resultadoEsperado,
      complemento: this.texts[index].complemento,
      mascara: this.texts[index].mascara,
      comprimento: this.texts[index].comprimento,
      ocorrencia: this.texts[index].ocorrencia,
      referencia: this.texts[index].referencia,
      localizacao: this.texts[index].localizacao,
    })
    
    this.page = this.texts[index].page
    this.textId = this.texts[index].id
  }

  tableClick(index: number) {
    this.selectSquare(this.squares[index])
  }


  addSquare() { 
    const newSquares = [...this.squares]
    let indexSquareById: number
    newSquares.map((square, squareIndex) => {
      if(square.id === this.squareId) indexSquareById = squareIndex
    })
    newSquares.splice(indexSquareById, 1)

    if(this.squaresForm.valid && !this.checkOverlap(newSquares, this.squaresForm.value.startX, this.squaresForm.value.startY, this.squaresForm.value.endX, this.squaresForm.value.endY)) {
      if(this.squareId) {
        let indexSquareById: number
        this.squares.map((square, squareIndex) => {
          if(square.id === this.squareId) indexSquareById = squareIndex
        })

        this.squares[indexSquareById] = {
          id: this.squareId, 
          page: this.page,
          name: this.squaresForm.value.name,
          startX: this.squaresForm.value.startX,
          startY: this.squaresForm.value.startY,
          endX: this.squaresForm.value.endX,
          endY: this.squaresForm.value.endY   
        }
      } else {
        const id = uuidV4()
        this.squares.push({
          id: id,
          page: this.page,
          name: this.squaresForm.value.name,
          startX: this.squaresForm.value.startX,
          startY: this.squaresForm.value.startY,
          endX: this.squaresForm.value.endX,
          endY: this.squaresForm.value.endY
        })

        this.squareId = id
      }
    } else {
      this.poNotification.warning({
        message: "erro ao salvar",
        duration: environment.poNotificationDuration
      })
    }
  }

  addText() { 
    if (this.textForm.valid) {
      const payload = {
        id: this.textId ?? uuidV4(),
        page: this.page,
        name: this.textForm.value.name,
        linha: this.textForm.value.linha,
        coluna: this.textForm.value.coluna,
        resultadoEsperado: this.textForm.value.resultadoEsperado,
        complemento: this.textForm.value.complemento,
        mascara: this.textForm.value.mascara,
        comprimento: this.textForm.value.comprimento,
        ocorrencia: this.textForm.value.ocorrencia,
        referencia: this.textForm.value.referencia,
        localizacao: this.textForm.value.localizacao
      }

      if (this.textId) {
        let textIndex: number
        this.texts.map((text, index) => {
          if (text.id === this.textId) textIndex = index
        })
        this.texts[textIndex] = payload
      } else this.texts.push(payload)
      
      this.textForm.reset()
      this.textId = null
    } else {
        this.poNotification.warning({
        message: "erro ao salvar",
        duration: environment.poNotificationDuration
      })
    }
  }

  deleteSquare() {
    if(this.squareId) {
      let indexSquareById: number
      this.squares.map((square, squareIndex) => {
        if(square.id === this.squareId) indexSquareById = squareIndex
      })

      this.squares.splice(indexSquareById, 1)
      this.resetForm()
      this.clearCanvas()
      this.redrawSquares()
    }
  }

  deleteText() {
    if(this.textId) {
      let indexTextById: number
      this.texts.map((text, textIndex) => {
        if(text.id === this.textId) indexTextById = textIndex
      })

      this.texts.splice(indexTextById, 1)
      this.textForm.reset()
      this.textId = null
    }
  }

  resetForm() {
    this.squaresForm.reset()
    this.squareId = null
    this.isFormDisabled = true
  }

  // Regra de três para responsividade dos quadrados dentro do Canvas
  arrayAdapt(squares, oldWidth, newWidth, oldHeight, newHeight) {
    let newSquares = []
    const ratioX = newWidth / oldWidth
    const ratioY = newHeight / oldHeight

    this.squares.map((square: Square) => {
      square.startX = Math.round(ratioX * square.startX)
      square.startY = Math.round(ratioY * square.startY)
      square.endX = Math.round(ratioX * square.endX)
      square.endY = Math.round(ratioY * square.endY)

      newSquares.push(square)
    })

    return newSquares
  }

  markAsDirty() {
    this.versaoDocumentoForm.controls.clienteId.markAsDirty()
    this.versaoDocumentoForm.controls.contratoId.markAsDirty()
    this.versaoDocumentoForm.controls.departamentoId.markAsDirty()
    this.versaoDocumentoForm.controls.tipoDocumentoId.markAsDirty()
    this.versaoDocumentoForm.controls.descricaoVersao.markAsDirty()
    this.versaoDocumentoForm.controls.qrcode.markAsDirty()
  }

  save(data) {
    const payload = {
      clienteId: data.clienteId,
      contratoId: data.contratoId,
      departamentoId: data.departamentoId,
      tipoDocumentoId: data.tipoDocumentoId,
      descricaoVersao: data.descricaoVersao,
      qrcode: data.qrcode,
      file: this.file,
      pageQuantity: this.pageTotal,
      campos: [...this.squares, ...this.texts],
      desabilitado: data.desabilitado
    }

    if (this.id) {
      payload["id"] = this.id
      this.subscriptions.add(
        this.restService
          .put(`/versoes-documento/${this.id}`, payload)
          .subscribe({
            next: (res: IResponse) => {
              this.router.navigate(["versoes-documento"])
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
          .post("/versoes-documento", payload)
          .subscribe({
            next: (res: IResponse) => {
              this.router.navigate(["versoes-documento"])
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
          .put(`/versoes-documento/${this.id}`, data)
          .subscribe({
            next: () => {
              this.versaoDocumentoForm.reset()
              this.router.navigate(["versoes-documento/new"])
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
          .post("/versoes-documento", data)
          .subscribe({
            next: () => {
              this.versaoDocumentoForm.reset()
              this.router.navigate(["versoes-documento/new"])
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

  goBack() {
    this.router.navigate(["versoes-documento"])
  }

  // resizeHeight() {
  //   const canvasHeight = document.getElementById('canvasForeground').offsetHeight
  //   document.getElementById("sideMenu").style.height = `${canvasHeight}px`
  // }

  public calculateImageWidth(width) {
    if(width > 1200) this.width = 2 * (width - 304) / 3 
    else this.width = 2 * (width - 48) / 3  

    setTimeout(() => {
      const img = document.getElementById('img')
      this.height = img.clientHeight

      this.squares = this.arrayAdapt(this.squares, this.currentWidth, this.width - 24, this.currentHeight, this.height)
      this.currentWidth = this.width - 24
      this.currentHeight = this.height
    }, 500)

    setTimeout(() => {
      this.contextForeground.lineCap = 'round'
      this.contextForeground.lineJoin = 'round'
      this.contextForeground.strokeStyle = 'blue'
      this.contextForeground.fillStyle = 'rgba(225,225,225,0.5)'
      this.contextForeground.lineWidth = 1
      this.clearCanvas()
      this.redrawSquares()
    }, 501)
  }

  refactStringToHtml(text: string): string {
    const parts = text.split("\n")
    let html = ""
    parts.map(part => {
      html = html + `<p style="font-family: 'Courier New', Courier, monospace; font-size: 12;">${part}</p>`
    })
    return html
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.resetForm()
    if(event) {
      this.calculateImageWidth(event.target.innerWidth)
    } else {
      this.calculateImageWidth(window.innerWidth)
    }
  }
}


