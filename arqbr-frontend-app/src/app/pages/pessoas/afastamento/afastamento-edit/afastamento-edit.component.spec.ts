import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AfastamentoEditComponent } from "./afastamento-edit.component"

describe("AfastamentoEditComponent", () => {
  let component: AfastamentoEditComponent
  let fixture: ComponentFixture<AfastamentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfastamentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AfastamentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
