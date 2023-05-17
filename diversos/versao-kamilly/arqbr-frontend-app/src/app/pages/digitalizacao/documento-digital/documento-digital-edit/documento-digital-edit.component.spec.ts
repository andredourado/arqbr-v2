import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DocumentoDigitalEditComponent } from "./documento-digital-edit.component"

describe("DocumentoDigitalEditComponent", () => {
  let component: DocumentoDigitalEditComponent
  let fixture: ComponentFixture<DocumentoDigitalEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoDigitalEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDigitalEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
