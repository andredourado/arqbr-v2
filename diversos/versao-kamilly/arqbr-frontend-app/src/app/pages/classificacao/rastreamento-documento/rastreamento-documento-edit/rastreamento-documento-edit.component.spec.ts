import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RastreamentoDocumentoEditComponent } from "./rastreamento-documento-edit.component"

describe("RastreamentoDocumentoEditComponent", () => {
  let component: RastreamentoDocumentoEditComponent
  let fixture: ComponentFixture<RastreamentoDocumentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RastreamentoDocumentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreamentoDocumentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
