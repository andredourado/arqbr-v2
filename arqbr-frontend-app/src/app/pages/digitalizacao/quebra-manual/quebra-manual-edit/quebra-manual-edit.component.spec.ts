import { ComponentFixture, TestBed } from "@angular/core/testing"

import { QuebraManualEditComponent } from "./quebra-manual-edit.component"

describe("quebraManualEditComponent", () => {
  let component: QuebraManualEditComponent
  let fixture: ComponentFixture<QuebraManualEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuebraManualEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuebraManualEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
