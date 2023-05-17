import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TimeColetaListComponent } from "./time-coleta-list.component"

describe("TimeColetaListComponent", () => {
  let component: TimeColetaListComponent
  let fixture: ComponentFixture<TimeColetaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeColetaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeColetaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
