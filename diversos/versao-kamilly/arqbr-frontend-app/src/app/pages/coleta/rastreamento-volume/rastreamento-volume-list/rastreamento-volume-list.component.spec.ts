import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RastreamentoVolumeListComponent } from "./rastreamento-volume-list.component"

describe("RastreamentoVolumeListComponent", () => {
  let component: RastreamentoVolumeListComponent
  let fixture: ComponentFixture<RastreamentoVolumeListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RastreamentoVolumeListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreamentoVolumeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
