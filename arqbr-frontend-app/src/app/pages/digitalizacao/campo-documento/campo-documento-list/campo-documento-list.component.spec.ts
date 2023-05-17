import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CampoDocumentoListComponent } from "./campo-documento-list.component"

describe("CampoDocumentoListComponent", () => {
  let component: CampoDocumentoListComponent
  let fixture: ComponentFixture<CampoDocumentoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoDocumentoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDocumentoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
