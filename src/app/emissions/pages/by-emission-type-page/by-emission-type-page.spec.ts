import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByEmissionTypePage } from './by-emission-type-page';
import { EmissionsService } from '../../services/emissions.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

describe('ByEmissionTypePage', () => {
  let component: ByEmissionTypePage;
  let fixture: ComponentFixture<ByEmissionTypePage>;
  let emissionsServiceMock: any;

  const mockEmissions = [
    { emission_type: 'CO2', year: 2020, emissions: 100 },
    { emission_type: 'CO2', year: 2020, emissions: 50 },
    { emission_type: 'CO2', year: 2021, emissions: 200 },
    { emission_type: 'CH4', year: 2020, emissions: 300 },
  ];

  beforeEach(async () => {
    emissionsServiceMock = {
      getEmissions: vi.fn().mockReturnValue(of(mockEmissions)),
    };

    await TestBed.configureTestingModule({
      imports: [ByEmissionTypePage],
      providers: [
        { provide: EmissionsService, useValue: emissionsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ByEmissionTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should load emissions and extract unique emission types on init', () => {
    component.ngOnInit();

    expect(emissionsServiceMock.getEmissions).toHaveBeenCalled();
    expect(component.rawData.length).toBe(4);
    expect(component.emission_type).toEqual(['CO2', 'CH4']);
  });

  it('should group emissions by year and update chart on emission type change', () => {
    component.rawData = mockEmissions as any;

    component.onEmissionTypeChange('CO2');

    expect(component.selectedActivity).toBe('CO2');

    expect(component.chartX).toEqual(['2020', '2021']);
    expect(component.chartY).toEqual([150, 200]);

    expect(component.chartTitle).toBe('Total emissions per year - CO2');
    expect(component.datasetLabel).toBe('GHG Emissions - CO2');
  });
});
