import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ComposicaoLoteListComponent } from "./composicao-lote-list.component"

describe("ComposicaoLoteListComponent", () => {
  let component: ComposicaoLoteListComponent
  let fixture: ComponentFixture<ComposicaoLoteListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposicaoLoteListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposicaoLoteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
