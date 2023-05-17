import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DocumentoDigitalCampoEditComponent } from "./documento-digital-campo-edit.component"

describe("DocumentoDigitalCampoEditComponent", () => {
  let component: DocumentoDigitalCampoEditComponent
  let fixture: ComponentFixture<DocumentoDigitalCampoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoDigitalCampoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDigitalCampoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
