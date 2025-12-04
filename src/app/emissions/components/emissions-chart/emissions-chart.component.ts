import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-emissions-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './emissions-chart.component.html',
})
export class EmissionsChartComponent implements OnChanges {
  @Input() xValues: string[] = [];
  @Input() yValues: number[] = [];
  @Input() title = 'Chart';
  @Input() datasetLabel = 'Dataset';
  @Input() chartType: ChartType = 'bar';
  @Input() xAxisTitle = 'X Axis';
  @Input() yAxisTitle = 'Y Axis';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: ''
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: ''
        }
      },
      y: {
        title: {
          display: true,
          text: ''
        }
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.xValues || !this.yValues || this.xValues.length === 0) return;

    this.chartData = {
      labels: this.xValues,
      datasets: [
        {
          data: this.yValues,
          label: this.datasetLabel,
        }
      ]
    };

    this.chartOptions = {
      ...this.chartOptions,
      plugins: {
        ...this.chartOptions?.plugins,
        title: {
          display: true,
          text: this.title
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: this.xAxisTitle
          }
        },
        y: {
          title: {
            display: true,
            text: this.yAxisTitle
          }
        }
      }
    };

    this.chart?.update();
  }

}
