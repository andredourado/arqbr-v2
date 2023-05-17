import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TimeColetaEditComponent } from "./time-coleta-edit.component"

describe("TimeColetaEditComponent", () => {
  let component: TimeColetaEditComponent
  let fixture: ComponentFixture<TimeColetaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeColetaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeColetaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
