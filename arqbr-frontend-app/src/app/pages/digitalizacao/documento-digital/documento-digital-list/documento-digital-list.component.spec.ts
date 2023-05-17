import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DocumentoDigitalListComponent } from "./documento-digital-list.component"

describe("DocumentoDigitalListComponent", () => {
  let component: DocumentoDigitalListComponent
  let fixture: ComponentFixture<DocumentoDigitalListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoDigitalListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDigitalListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
