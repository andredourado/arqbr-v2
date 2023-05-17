import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/campo-documento-list",
  templateUrl: ".//campo-documento-list.component.html",
})
export class CampoDocumentoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'campoDocumento'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'tipoDocumentoDescricao', label: this.literals.fields.list['tipoDocumentoDescricao'] },
          { property: 'nomeCampo', label: this.literals.fields.list['nomeCampo'] },
          { property: 'titulo', label: this.literals.fields.list['titulo'] },
          { property: 'metodoExtracao', label: this.literals.fields.list['metodoExtracao'] }
        ]
      })
  }

}
