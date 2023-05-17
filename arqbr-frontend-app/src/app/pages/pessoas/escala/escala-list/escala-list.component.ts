import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/escala-list",
  templateUrl: ".//escala-list.component.html",
})
export class EscalaListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'pessoas', options: 'escala'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'pessoaNome', label: this.literals.fields.list['pessoaNome'] },
          { property: 'jornadaDescricao', label: this.literals.fields.list['jornadaDescricao'] },
        ]
      })
  }

}
