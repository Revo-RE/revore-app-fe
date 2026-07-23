import { Component, Input } from '@angular/core';
import { GoogleChartsService } from '@private/shared/services/google-charts.service';
import { Subscription } from 'rxjs';
import { IHorizontalLines } from './interfaces/horizontal-line.interface';

declare let google: any;
@Component({
    selector: 'app-horizontal-lines',
    imports: [],
    templateUrl: './horizontal-lines.component.html'
})
export class HorizontalLinesComponent {
  @Input({ required: true }) title: string = '';
  @Input() graphicData!: IHorizontalLines;
  @Input() containerID: string = 'horizontal-lines';
  subscriptions: Subscription = new Subscription();

  constructor(private gooChartS: GoogleChartsService) {}

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.gooChartS.isScriptLoad$.subscribe((result) => {
        if(this.graphicData.colums.length > 0)
        result === true && this.drawGraphic();
      })
    );
  }

  drawGraphic() {
    const data = new google.visualization.DataTable();
    this.graphicData?.colums.forEach( (col: any) => {      
      data.addColumn(...col);
    });
    data.addRows([
      ...this.graphicData?.rows
    ]);
    const options = {
      legend: {
        position: 'bottom',
        alignment: 'start', 
        maxLines: 4,
        slantedText: false,
        textStyle: {
          fontSize: 10,
          color: '#3E5170',
        },
      },
      chartArea: { left: 50, top: 10, width: '100%', height: '250' },
      tooltip: {
        color: '#3E5170',
        fontSize: 10,
      },
      
      colors: ['#E59470', '#B55A34','#2E3C59', '#657A9B'],
      hAxis: {
        textStyle: {
          fontSize: 10,
          color: '#3E5170',
        },
      },
      vAxis: {
        textStyle: {
          fontSize: 10,
          color: '#3E5170',
          
        },
      },
    };
    const chart = new google.visualization.LineChart(
      document.getElementById(this.containerID)
    );
    chart.draw(data, options);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
