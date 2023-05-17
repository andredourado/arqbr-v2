import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FuncaoEditComponent } from "./funcao-edit.component"

describe("FuncaoEditComponent", () => {
  let component: FuncaoEditComponent
  let fixture: ComponentFixture<FuncaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
