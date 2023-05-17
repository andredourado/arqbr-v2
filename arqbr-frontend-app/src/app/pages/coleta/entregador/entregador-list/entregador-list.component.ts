import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/entregador-list",
  templateUrl: ".//entregador-list.component.html",
})
export class EntregadorListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'coleta', options: 'entregador'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'cpfCnpj', label: this.literals.fields.list['cpfCnpj'] },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'email', label: this.literals.fields.list['email'] }
        ]
      })
  }

}
