import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PontoColetaListComponent } from "./ponto-coleta-list.component"

describe("PontoColetaListComponent", () => {
  let component: PontoColetaListComponent
  let fixture: ComponentFixture<PontoColetaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PontoColetaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoColetaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
