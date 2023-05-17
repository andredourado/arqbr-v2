import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ColetaEditComponent } from "./coleta-edit.component"

describe("ColetaEditComponent", () => {
  let component: ColetaEditComponent
  let fixture: ComponentFixture<ColetaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColetaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
