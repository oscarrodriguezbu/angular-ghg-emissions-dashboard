import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByActivityPage } from './by-activity-page';
import { EmissionsService } from '../../services/emissions.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

describe('ByActivityPage', () => {
  let component: ByActivityPage;
  let fixture: ComponentFixture<ByActivityPage>;
  let emissionsServiceMock: any;

  const mockEmissions = [
    { activity: 'Transport', year: 2020, emissions: 100 },
    { activity: 'Transport', year: 2020, emissions: 50 },
    { activity: 'Transport', year: 2021, emissions: 200 },
    { activity: 'Industry', year: 2020, emissions: 300 },
  ];

  beforeEach(async () => {
    emissionsServiceMock = {
      getEmissions: vi.fn().mockReturnValue(of(mockEmissions)),
    };

    await TestBed.configureTestingModule({
      imports: [ByActivityPage],
      providers: [
        { provide: EmissionsService, useValue: emissionsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ByActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should load emissions and extract unique activities on init', () => {
    component.ngOnInit();

    expect(emissionsServiceMock.getEmissions).toHaveBeenCalled();
    expect(component.rawData.length).toBe(4);
    expect(component.activities).toEqual(['Transport', 'Industry']);
  });

  it('should group emissions by year and update chart on activity change', () => {
    component.rawData = mockEmissions as any;

    component.onActivityChange('Transport');

    expect(component.selectedActivity).toBe('Transport');

    expect(component.chartX).toEqual(['2020', '2021']);
    expect(component.chartY).toEqual([150, 200]);

    expect(component.chartTitle).toBe('Total emissions per year - Transport');
    expect(component.datasetLabel).toBe('GHG Emissions - Transport');
  });
});
