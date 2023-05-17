import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EscalaEditComponent } from "./escala-edit.component"

describe("EscalaEditComponent", () => {
  let component: EscalaEditComponent
  let fixture: ComponentFixture<EscalaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscalaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
