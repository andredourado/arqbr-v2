import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ComposicaoLoteEditComponent } from "./composicao-lote-edit.component"

describe("ComposicaoLoteEditComponent", () => {
  let component: ComposicaoLoteEditComponent
  let fixture: ComponentFixture<ComposicaoLoteEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposicaoLoteEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposicaoLoteEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
