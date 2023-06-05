import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DefinicaoExtracaoListComponent } from "./definicao-extracao-list.component"

describe("DefinicaoExtracaoListComponent", () => {
  let component: DefinicaoExtracaoListComponent
  let fixture: ComponentFixture<DefinicaoExtracaoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinicaoExtracaoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicaoExtracaoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
