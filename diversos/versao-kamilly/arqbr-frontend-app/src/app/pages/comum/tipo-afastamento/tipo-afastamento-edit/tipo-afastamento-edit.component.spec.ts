import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoAfastamentoEditComponent } from "./tipo-afastamento-edit.component"

describe("TipoAfastamentoEditComponent", () => {
  let component: TipoAfastamentoEditComponent
  let fixture: ComponentFixture<TipoAfastamentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoAfastamentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAfastamentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
