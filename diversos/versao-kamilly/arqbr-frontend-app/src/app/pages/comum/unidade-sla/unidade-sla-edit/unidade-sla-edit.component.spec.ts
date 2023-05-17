import { ComponentFixture, TestBed } from "@angular/core/testing"

import { UnidadeSlaEditComponent } from "./unidade-sla-edit.component"

describe("UnidadeSlaEditComponent", () => {
  let component: UnidadeSlaEditComponent
  let fixture: ComponentFixture<UnidadeSlaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadeSlaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeSlaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
