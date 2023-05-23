import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AjusteManualEditComponent } from "./ajuste-manual-edit.component"

describe("quebraManualEditComponent", () => {
  let component: AjusteManualEditComponent
  let fixture: ComponentFixture<AjusteManualEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjusteManualEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteManualEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
