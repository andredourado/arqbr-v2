import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/planta-list",
  templateUrl: ".//planta-list.component.html",
})
export class PlantaListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'armazenamento', options: 'planta'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'unidadeNome', label: this.literals.fields.list['unidadeNome'] },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'quantidadePosicoes', label: this.literals.fields.list['quantidadePosicoes'], type: 'number' }
        ]
      })
  }

}
