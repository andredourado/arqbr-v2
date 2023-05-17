import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FrequenciaListComponent } from "./frequencia-list.component"

describe("FrequenciaListComponent", () => {
  let component: FrequenciaListComponent
  let fixture: ComponentFixture<FrequenciaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequenciaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
