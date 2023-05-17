import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/pessoa-list",
  templateUrl: ".//pessoa-list.component.html",
})
export class PessoaListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'pessoas', options: 'pessoa'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'unidadeNome', label: this.literals.fields.list['unidadeNome'] },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'email', label: this.literals.fields.list['email'] },
          { property: 'funcaoDescricao', label: this.literals.fields.list['funcaoDescricao'] },
        ]
      })
  }

}
