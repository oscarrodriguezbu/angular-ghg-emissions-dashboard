import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByCountryPage } from './by-country-page';
import { EmissionsService } from '../../services/emissions.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

describe('ByCountryPage', () => {
  let component: ByCountryPage;
  let fixture: ComponentFixture<ByCountryPage>;
  let emissionsServiceMock: any;

  const mockEmissions = [
    { country: 'Colombia', year: 2020, emissions: 100 },
    { country: 'Colombia', year: 2021, emissions: 150 },
    { country: 'USA', year: 2020, emissions: 300 },
  ];

  beforeEach(async () => {
    emissionsServiceMock = {
      getEmissions: vi.fn().mockReturnValue(of(mockEmissions)),
    };

    await TestBed.configureTestingModule({
      imports: [ByCountryPage],
      providers: [
        { provide: EmissionsService, useValue: emissionsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ByCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should load emissions and extract unique countries on init', () => {
    component.ngOnInit();

    expect(emissionsServiceMock.getEmissions).toHaveBeenCalled();
    expect(component.rawData.length).toBe(3);
    expect(component.countries).toEqual(['Colombia', 'USA']);
  });

  it('should update chart data when country changes', () => {
    component.rawData = mockEmissions as any;

    component.onCountryChange('Colombia');

    expect(component.selectedCountry).toBe('Colombia');
    expect(component.chartX).toEqual(['2020', '2021']);
    expect(component.chartY).toEqual([100, 150]);
    expect(component.chartTitle).toBe('Emissions per year in Colombia');
    expect(component.datasetLabel).toBe('GHG Emissions - Colombia');
  });
});
