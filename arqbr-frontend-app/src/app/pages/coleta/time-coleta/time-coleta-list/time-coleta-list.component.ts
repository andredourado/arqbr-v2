import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/time-coleta-list",
  templateUrl: ".//time-coleta-list.component.html",
})
export class TimeColetaListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'coleta', options: 'timeColeta'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'coletaIdentificador', label: this.literals.fields.list['coletaIdentificador'] },
          { property: 'pessoaNome', label: this.literals.fields.list['pessoaNome'] },
        ]
      })
  }

}
