import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FrequenciaEditComponent } from "./frequencia-edit.component"

describe("FrequenciaEditComponent", () => {
  let component: FrequenciaEditComponent
  let fixture: ComponentFixture<FrequenciaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequenciaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
