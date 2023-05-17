import { ComponentFixture, TestBed } from "@angular/core/testing"

import { VersaoDocumentoListComponent } from "./versao-documento-list.component"

describe("VersaoDocumentoListComponent", () => {
  let component: VersaoDocumentoListComponent
  let fixture: ComponentFixture<VersaoDocumentoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersaoDocumentoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoDocumentoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
