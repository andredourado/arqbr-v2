import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/rastreamento-volume-list",
  templateUrl: ".//rastreamento-volume-list.component.html",
})
export class RastreamentoVolumeListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'coleta', options: 'rastreamentoVolume'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'volumeIdentificador', label: this.literals.fields.list['volumeIdentificador'] },
        ]
      })
  }

}
