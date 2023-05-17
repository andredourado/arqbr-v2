import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PosicaoListComponent } from "./posicao-list.component"

describe("PosicaoListComponent", () => {
  let component: PosicaoListComponent
  let fixture: ComponentFixture<PosicaoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosicaoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicaoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
