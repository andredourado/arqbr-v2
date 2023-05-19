import { ComponentFixture, TestBed } from "@angular/core/testing"

import { QuebraManualListComponent } from "./quebra-manual-list.component"

describe("QuebraManualListComponent", () => {
  let component: QuebraManualListComponent
  let fixture: ComponentFixture<QuebraManualListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuebraManualListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuebraManualListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
