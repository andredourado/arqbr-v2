import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/unidade-list",
  templateUrl: ".//unidade-list.component.html",
})
export class UnidadeListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'armazenamento', options: 'unidade'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'estadoUf', label: this.literals.fields.list['estadoUf'] },
          { property: 'cidadeNomeCidade', label: this.literals.fields.list['cidadeNomeCidade'] },
          { property: 'nome', label: this.literals.fields.list['nome'] }
        ]
      })
  }

}
