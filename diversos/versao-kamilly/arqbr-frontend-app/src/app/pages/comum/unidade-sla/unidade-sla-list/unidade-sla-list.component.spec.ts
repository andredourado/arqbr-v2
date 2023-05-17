import { ComponentFixture, TestBed } from "@angular/core/testing"

import { UnidadeSlaListComponent } from "./unidade-sla-list.component"

describe("UnidadeSlaListComponent", () => {
  let component: UnidadeSlaListComponent
  let fixture: ComponentFixture<UnidadeSlaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadeSlaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeSlaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
