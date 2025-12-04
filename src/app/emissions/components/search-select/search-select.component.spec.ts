import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSelectComponent } from './search-select.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort values alphabetically when input is set', () => {
    component.values = ['zebra', 'apple', 'mango'];

    expect(component.values).toEqual(['apple', 'mango', 'zebra']);
  });

  it('should emit selected value on change', () => {
    const spy = vi.spyOn(component.valueChange, 'emit');

    component.selectedValue = 'Colombia';
    component.onChange();

    expect(spy).toHaveBeenCalledWith('Colombia');
  });

  it('should not break if values is null or undefined', () => {
    component.values = undefined as any;

    expect(component.values).toEqual([]);
  });
});
