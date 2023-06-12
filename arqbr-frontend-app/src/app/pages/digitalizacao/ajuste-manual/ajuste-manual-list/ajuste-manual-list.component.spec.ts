import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AjusteManualListComponent } from "./ajuste-manual-list.component"

describe("AjusteManualListComponent", () => {
  let component: AjusteManualListComponent
  let fixture: ComponentFixture<AjusteManualListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjusteManualListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteManualListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
