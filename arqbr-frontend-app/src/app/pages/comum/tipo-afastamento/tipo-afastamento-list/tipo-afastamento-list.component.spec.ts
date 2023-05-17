import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoAfastamentoListComponent } from "./tipo-afastamento-list.component"

describe("TipoAfastamentoListComponent", () => {
  let component: TipoAfastamentoListComponent
  let fixture: ComponentFixture<TipoAfastamentoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoAfastamentoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAfastamentoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
