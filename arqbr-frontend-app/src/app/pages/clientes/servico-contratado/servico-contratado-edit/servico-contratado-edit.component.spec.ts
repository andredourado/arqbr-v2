import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ServicoContratadoEditComponent } from "./servico-contratado-edit.component"

describe("ServicoContratadoEditComponent", () => {
  let component: ServicoContratadoEditComponent
  let fixture: ComponentFixture<ServicoContratadoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicoContratadoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoContratadoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
