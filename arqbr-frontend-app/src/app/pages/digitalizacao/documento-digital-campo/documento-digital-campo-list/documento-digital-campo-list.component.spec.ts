import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DocumentoDigitalCampoListComponent } from "./documento-digital-campo-list.component"

describe("DocumentoDigitalCampoListComponent", () => {
  let component: DocumentoDigitalCampoListComponent
  let fixture: ComponentFixture<DocumentoDigitalCampoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoDigitalCampoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDigitalCampoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
