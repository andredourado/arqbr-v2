import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/afastamento-list",
  templateUrl: ".//afastamento-list.component.html",
})
export class AfastamentoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'pessoas', options: 'afastamento'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'pessoaNome', label: this.literals.fields.list['pessoaNome'] },
          { property: 'tipoAfastamentoDescricao', label: this.literals.fields.list['tipoAfastamentoDescricao'] },
          { property: 'inicio', label: this.literals.fields.list['inicio'], type: 'date' },
          { property: 'fim', label: this.literals.fields.list['fim'], type: 'date' }
        ]
      })
  }

}
