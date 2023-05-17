import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FrequenciaColetaListComponent } from "./frequencia-coleta-list.component"

describe("FrequenciaColetaListComponent", () => {
  let component: FrequenciaColetaListComponent
  let fixture: ComponentFixture<FrequenciaColetaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequenciaColetaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaColetaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
