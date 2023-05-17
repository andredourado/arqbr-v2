import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FrequenciaColetaEditComponent } from "./frequencia-coleta-edit.component"

describe("FrequenciaColetaEditComponent", () => {
  let component: FrequenciaColetaEditComponent
  let fixture: ComponentFixture<FrequenciaColetaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequenciaColetaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaColetaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
