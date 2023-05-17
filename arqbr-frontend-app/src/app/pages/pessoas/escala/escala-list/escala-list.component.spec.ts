import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EscalaListComponent } from "./escala-list.component"

describe("EscalaListComponent", () => {
  let component: EscalaListComponent
  let fixture: ComponentFixture<EscalaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscalaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
