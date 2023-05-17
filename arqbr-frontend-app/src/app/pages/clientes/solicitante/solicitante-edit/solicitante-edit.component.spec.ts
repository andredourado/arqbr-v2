import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SolicitanteEditComponent } from "./solicitante-edit.component"

describe("SolicitanteEditComponent", () => {
  let component: SolicitanteEditComponent
  let fixture: ComponentFixture<SolicitanteEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitanteEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitanteEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
