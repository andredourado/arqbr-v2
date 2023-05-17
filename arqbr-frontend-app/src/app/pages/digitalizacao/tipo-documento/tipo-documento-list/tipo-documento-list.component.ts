import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/tipo-documento-list",
  templateUrl: ".//tipo-documento-list.component.html",
})
export class TipoDocumentoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'tipoDocumento'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'clienteNomeFantasia', label: this.literals.fields.list['clienteNomeFantasia'] },
          { property: 'departamentoNome', label: this.literals.fields.list['departamentoNome'] },
          { property: 'descricao', label: this.literals.fields.list['descricao'] },
          { property: 'identificador', label: this.literals.fields.list['identificador'] }
        ]
      })
  }

}
