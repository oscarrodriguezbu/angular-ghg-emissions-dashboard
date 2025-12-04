import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchSelectComponent } from '../../components/search-select/search-select.component';
import { EmissionsChartComponent } from '../../components/emissions-chart.component/emissions-chart.component';
import { EmissionsService } from '../../services/emissions.service';
import type { Emission } from '../../interfaces/emission.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchSelectComponent, EmissionsChartComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage implements OnInit {
  rawData: Emission[] = [];
  filteredData: Emission[] = [];
  countries: string[] = [];

  selectedCountry = '';

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
      this.countries = [...new Set(data.map(d => d.country))];
      this.cdr.detectChanges();
    });
  }

  onCountryChange(country: string) {
    this.selectedCountry = country;

    const filtered = this.rawData
      .filter(item => item.country === country)
      .sort((a, b) => a.year - b.year);

    this.chartX = filtered.map(item => item.year.toString());
    this.chartY = filtered.map(item => item.emissions);

    this.chartTitle = `Emissions per year in ${country}`;
    this.datasetLabel = `GHG Emissions - ${country}`;
  }

}
