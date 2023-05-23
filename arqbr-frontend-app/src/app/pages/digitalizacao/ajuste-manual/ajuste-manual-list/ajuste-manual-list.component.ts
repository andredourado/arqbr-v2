import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

const ZOOM_STEP: number = 0.1
const DEFAULT_ZOOM: number = 0.6

@Component({
  selector: "/quebra-manual-list",
  templateUrl: "./quebra-manual-list.component.html",
})
export class QuebraManualListComponent implements OnInit {
  id: string
  page: number = 1
  scale = DEFAULT_ZOOM
  totalPages: number = 0
  isLoaded: boolean = false
  src: any = ''
  nomeArquivo: string
  solicitacaoFisico: boolean = false
  textoBotao = ''
  items: any
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'quebraManual'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'nomeArquivo', label: this.literals.fields.list[''] },
          { property: 'conteudo', label: this.literals.fields.list[''] }
        ]
      })
  }

  

}
