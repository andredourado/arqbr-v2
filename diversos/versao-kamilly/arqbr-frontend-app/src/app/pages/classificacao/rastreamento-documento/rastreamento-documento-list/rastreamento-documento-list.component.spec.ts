import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RastreamentoDocumentoListComponent } from "./rastreamento-documento-list.component"

describe("RastreamentoDocumentoListComponent", () => {
  let component: RastreamentoDocumentoListComponent
  let fixture: ComponentFixture<RastreamentoDocumentoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RastreamentoDocumentoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreamentoDocumentoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
