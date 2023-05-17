import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/posicao-list",
  templateUrl: ".//posicao-list.component.html",
})
export class PosicaoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'armazenamento', options: 'posicao'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'unidadeNome', label: this.literals.fields.list['unidadeNome'] },
          { property: 'plantaNome', label: this.literals.fields.list['plantaNome'] },
          { property: 'rua', label: this.literals.fields.list['rua'] },
          { property: 'linha', label: this.literals.fields.list['linha'] },
          { property: 'coluna', label: this.literals.fields.list['coluna'] },
          { property: 'posicoes', label: this.literals.fields.list['posicoes'], type: 'number' }
        ]
      })
  }

}
