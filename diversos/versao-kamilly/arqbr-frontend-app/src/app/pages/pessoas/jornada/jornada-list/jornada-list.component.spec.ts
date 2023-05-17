import { ComponentFixture, TestBed } from "@angular/core/testing"

import { JornadaListComponent } from "./jornada-list.component"

describe("JornadaListComponent", () => {
  let component: JornadaListComponent
  let fixture: ComponentFixture<JornadaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JornadaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
