import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RastreamentoVolumeEditComponent } from "./rastreamento-volume-edit.component"

describe("RastreamentoVolumeEditComponent", () => {
  let component: RastreamentoVolumeEditComponent
  let fixture: ComponentFixture<RastreamentoVolumeEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RastreamentoVolumeEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreamentoVolumeEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
