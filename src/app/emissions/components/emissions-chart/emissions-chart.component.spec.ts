import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmissionsChartComponent } from './emissions-chart.component';
import { SimpleChange } from '@angular/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EmissionsChartComponent', () => {
  let component: EmissionsChartComponent;
  let fixture: ComponentFixture<EmissionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data when inputs change', () => {
    const updateSpy = vi.fn();

    (component as any).chart = {
      update: updateSpy
    };

    component.xValues = ['2020', '2021', '2022'];
    component.yValues = [10, 20, 30];
    component.title = 'My Chart';
    component.datasetLabel = 'My Dataset';

    component.ngOnChanges({
      xValues: new SimpleChange([], component.xValues, true),
      yValues: new SimpleChange([], component.yValues, true),
      title: new SimpleChange('', component.title, true),
      datasetLabel: new SimpleChange('', component.datasetLabel, true),
    });

    expect(component.chartData.labels).toEqual(['2020', '2021', '2022']);
    expect(component.chartData.datasets[0].data).toEqual([10, 20, 30]);
    expect(component.chartData.datasets[0].label).toBe('My Dataset');
    expect(component.chartOptions?.plugins?.title?.text).toBe('My Chart');
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should not update chart if xValues is empty', () => {
    const updateSpy = vi.fn();
    (component as any).chart = { update: updateSpy };

    component.xValues = [];
    component.yValues = [];

    component.ngOnChanges({
      xValues: new SimpleChange([], [], true),
    });

    expect(updateSpy).not.toHaveBeenCalled();
  });
});
