import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-comparativa',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit {
  chart1: any;
  chart2: any;

  constructor(private reportService: ReportService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getAsistenciaData();
    this.getComparativaData();
  }

  getAsistenciaData() {
    this.reportService.getSecondChartData().subscribe((data) => {
      const dia1CC = data.dia1?.CC || 0;
      const dia1AU = data.dia1?.AU || 0;
      const dia2CC = data.dia2?.CC || 0;
      const dia2AU = data.dia2?.AU || 0;

      this.renderChart2([dia1CC, dia1AU], [dia2CC, dia2AU]);
    });
  }

  getComparativaData() {
    this.reportService.getFirstChartData().subscribe((data) => {
      const zonas = data.map((item) => item.us_zone);
      const inscritos = data.map((item) => item.total_inscritos);
      const dia1 = data.map((item) => item.asistentes_dia1);
      const dia2 = data.map((item) => item.asistentes_dia2);

      this.renderChart1(zonas, inscritos, dia1, dia2);
    });
  }

  renderChart1(
    zonas: string[],
    inscritos: number[],
    dia1: number[],
    dia2: number[]
  ) {
    this.chart1 = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: zonas,
        datasets: [
          {
            label: 'Inscritos',
            data: inscritos,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderRadius: 7,
            borderWidth: 2,
          },
          {
            label: 'Asistentes Día 1',
            data: dia1,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderRadius: 7,
            borderWidth: 2,
          },
          {
            label: 'Asistentes Día 2',
            data: dia2,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderRadius: 7,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false,
            title: {
              display: true,
              text: 'Zona',
            },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad',
            },
          },
        },
      },
    });
  }

  destroyChart(chart: Chart | undefined) {
    console.log('Destro');
    chart?.destroy();
  }

  renderChart2(dia1Data: number[], dia2Data: number[]) {
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: ['Día 1', 'Día 2'],
        datasets: [
          {
            label: 'Circuito Cerrado',
            data: [dia1Data[0], dia2Data[0]],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderRadius: 5,
            borderWidth: 1,
          },
          {
            label: 'Auditorio',
            data: [dia1Data[1], dia2Data[1]],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderRadius: 5,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Día',
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Asistentes',
            },
          }
        },
      },
    });
  }
}
