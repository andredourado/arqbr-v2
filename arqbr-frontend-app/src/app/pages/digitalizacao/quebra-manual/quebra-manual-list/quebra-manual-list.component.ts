import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/quebra-manual-list",
  templateUrl: "./quebra-manual-list.component.html",
})
export class QuebraManualListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'digitalizacao', options: 'Quebra Manual'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'nomeArquivo', label: this.literals.fields.list[''] },
          { property: 'conteudo', label: this.literals.fields.list[''] }
        ]
      })
  }

}
