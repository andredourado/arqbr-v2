import { ComponentFixture, TestBed } from "@angular/core/testing"

import { JornadaEditComponent } from "./jornada-edit.component"

describe("JornadaEditComponent", () => {
  let component: JornadaEditComponent
  let fixture: ComponentFixture<JornadaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JornadaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
