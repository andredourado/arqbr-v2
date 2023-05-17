import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PontoColetaEditComponent } from "./ponto-coleta-edit.component"

describe("PontoColetaEditComponent", () => {
  let component: PontoColetaEditComponent
  let fixture: ComponentFixture<PontoColetaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PontoColetaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoColetaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
