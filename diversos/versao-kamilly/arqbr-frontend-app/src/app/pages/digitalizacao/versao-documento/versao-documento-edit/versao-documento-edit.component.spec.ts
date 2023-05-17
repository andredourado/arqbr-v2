import { ComponentFixture, TestBed } from "@angular/core/testing"

import { VersaoDocumentoEditComponent } from "./versao-documento-edit.component"

describe("VersaoDocumentoEditComponent", () => {
  let component: VersaoDocumentoEditComponent
  let fixture: ComponentFixture<VersaoDocumentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersaoDocumentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoDocumentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
