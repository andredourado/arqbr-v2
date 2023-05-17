import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SolicitanteListComponent } from "./solicitante-list.component"

describe("SolicitanteListComponent", () => {
  let component: SolicitanteListComponent
  let fixture: ComponentFixture<SolicitanteListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitanteListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitanteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
