import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CampoDocumentoEditComponent } from "./campo-documento-edit.component"

describe("CampoDocumentoEditComponent", () => {
  let component: CampoDocumentoEditComponent
  let fixture: ComponentFixture<CampoDocumentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoDocumentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDocumentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
