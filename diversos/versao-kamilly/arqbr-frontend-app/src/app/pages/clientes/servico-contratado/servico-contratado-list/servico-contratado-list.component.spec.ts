import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ServicoContratadoListComponent } from "./servico-contratado-list.component"

describe("ServicoContratadoListComponent", () => {
  let component: ServicoContratadoListComponent
  let fixture: ComponentFixture<ServicoContratadoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicoContratadoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoContratadoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
