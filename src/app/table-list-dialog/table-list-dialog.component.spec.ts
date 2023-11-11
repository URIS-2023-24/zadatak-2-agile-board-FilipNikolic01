import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListDialogComponent } from './table-list-dialog.component';

describe('TableListDialogComponent', () => {
  let component: TableListDialogComponent;
  let fixture: ComponentFixture<TableListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
