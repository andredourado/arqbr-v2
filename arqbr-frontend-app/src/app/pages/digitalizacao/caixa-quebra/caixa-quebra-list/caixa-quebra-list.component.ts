import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/caixa-quebra-list",
  templateUrl: ".//caixa-quebra-list.component.html",
})
export class CaixaQuebraListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'caixaQuebra'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'clienteNomeFantasia', label: this.literals.fields.list['clienteNomeFantasia'] },
          { property: 'departamentoNome', label: this.literals.fields.list['departamentoNome'] },
          { property: 'tipoDocumentoDescricao', label: this.literals.fields.list['tipoDocumentoDescricao'] },
          { property: 'nomeArquivoOrigem', label: this.literals.fields.list['nomeArquivoOrigem'] },
          { property: 'sequencia', label: this.literals.fields.list['sequencia'], type: 'number' }
        ]
      })
  }

}
