import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PlantaEditComponent } from "./planta-edit.component"

describe("PlantaEditComponent", () => {
  let component: PlantaEditComponent
  let fixture: ComponentFixture<PlantaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
