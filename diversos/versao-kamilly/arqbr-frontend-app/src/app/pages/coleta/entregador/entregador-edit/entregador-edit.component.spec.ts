import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EntregadorEditComponent } from "./entregador-edit.component"

describe("EntregadorEditComponent", () => {
  let component: EntregadorEditComponent
  let fixture: ComponentFixture<EntregadorEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregadorEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadorEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
