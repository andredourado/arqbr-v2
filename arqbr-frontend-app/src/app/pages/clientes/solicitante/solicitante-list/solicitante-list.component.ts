import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/solicitante-list",
  templateUrl: ".//solicitante-list.component.html",
})
export class SolicitanteListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'clientes', options: 'solicitante'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'clienteNomeFantasia', label: this.literals.fields.list['clienteNomeFantasia'] },
          { property: 'departamentoNome', label: this.literals.fields.list['departamentoNome'] },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'email', label: this.literals.fields.list['email'] }
        ]
      })
  }

}
