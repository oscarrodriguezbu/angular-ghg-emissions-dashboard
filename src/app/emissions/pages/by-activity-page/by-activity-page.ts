import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchSelectComponent } from '../../components/search-select/search-select.component';
import { EmissionsChartComponent } from '../../components/emissions-chart/emissions-chart.component';
import { EmissionsService } from '../../services/emissions.service';
import type { Emission } from '../../interfaces/emission.interface';

@Component({
  selector: 'app-by-activity-page',
  imports: [SearchSelectComponent, EmissionsChartComponent],
  templateUrl: './by-activity-page.html',
})
export class ByActivityPage implements OnInit {
  rawData: Emission[] = [];

  activities: string[] = [];
  selectedActivity = '';

  chartX: string[] = [];
  chartY: number[] = [];
  chartTitle = '';
  datasetLabel = '';
  chartType: 'line' | 'bar' = 'line';
  xAxisTitle = "Year";
  yAxisTitle = "Emissions";

  constructor(
    private readonly emissionsService: EmissionsService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.emissionsService.getEmissions().subscribe(data => {
      this.rawData = data;

      this.activities = [...new Set(data.map(d => d.activity))];

      this.cdr.detectChanges();
    });
  }

  onActivityChange(activity: string) {
    this.selectedActivity = activity;

    const filtered = this.rawData.filter(item => item.activity === activity);

    const emissionsByYear = filtered.reduce((acc, item) => {
      acc[item.year] = (acc[item.year] || 0) + item.emissions;
      return acc;
    }, {} as Record<number, number>);

    const sortedYears = Object.keys(emissionsByYear)
      .map(Number)
      .sort((a, b) => a - b);

    this.chartX = sortedYears.map(year => year.toString());
    this.chartY = sortedYears.map(year => emissionsByYear[year]);

    this.chartTitle = `Total emissions per year - ${activity}`;
    this.datasetLabel = `GHG Emissions - ${activity}`;
  }
}
