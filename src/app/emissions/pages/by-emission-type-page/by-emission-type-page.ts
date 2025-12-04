import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchSelectComponent } from '../../components/search-select/search-select.component';
import { EmissionsChartComponent } from '../../components/emissions-chart.component/emissions-chart.component';
import { EmissionsService } from '../../services/emissions.service';
import type { Emission } from '../../interfaces/emission.interface';
@Component({
  selector: 'app-by-emision-type-page',
  imports: [SearchSelectComponent, EmissionsChartComponent],
  templateUrl: './by-emission-type-page.html',
})
export class ByEmissionTypePage implements OnInit {
  rawData: Emission[] = [];

  emission_type: string[] = [];
  selectedActivity = '';

  chartX: string[] = [];
  chartY: number[] = [];
  chartTitle = '';
  datasetLabel = '';
  chartType: 'line' | 'bar' = 'line';

  constructor(
    private readonly emissionsService: EmissionsService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.emissionsService.getEmissions().subscribe(data => {
      this.rawData = data;

      this.emission_type = [...new Set(data.map(d => d.emission_type))];

      this.cdr.detectChanges();
    });
  }

  onEmissionTypeChange(emission_type: string) {
    this.selectedActivity = emission_type;

    const filtered = this.rawData.filter(item => item.emission_type === emission_type);

    const emissionsByYear = filtered.reduce((acc, item) => {
      acc[item.year] = (acc[item.year] || 0) + item.emissions;
      return acc;
    }, {} as Record<number, number>);

    const sortedYears = Object.keys(emissionsByYear)
      .map(Number)
      .sort((a, b) => a - b);

    this.chartX = sortedYears.map(year => year.toString());
    this.chartY = sortedYears.map(year => emissionsByYear[year]);

    this.chartTitle = `Total emissions per year - ${emission_type}`;
    this.datasetLabel = `GHG Emissions - ${emission_type}`;
  }
}

