import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/documento-digital-campo-list",
  templateUrl: ".//documento-digital-campo-list.component.html",
})
export class DocumentoDigitalCampoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'documentoDigitalCampo'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'documentoDigitalNip', label: this.literals.fields.list['documentoDigitalNip'] },
          { property: 'campoDocumentoNomeCampo', label: this.literals.fields.list['campoDocumentoNomeCampo'] },
          { property: 'conteudo', label: this.literals.fields.list['conteudo'] }
        ]
      })
  }

}
