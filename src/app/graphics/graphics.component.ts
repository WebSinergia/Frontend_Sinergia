import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css'
})
export class GraphicsComponent {
  chart: any;

  constructor(private reportService: ReportService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getAsistenciaData();
  }

  getAsistenciaData() {
    this.reportService.getFirstChartData()
      .subscribe((data) => {
        const zones = data.map(item => item.us_zone);
        const totalInscritos = data.map(item => item.total_inscritos);
        const asistentesDia1 = data.map(item => item.asistentes_dia1);
        const asistentesDia2 = data.map(item => item.asistentes_dia2);

        this.renderChart(zones, totalInscritos, asistentesDia1, asistentesDia2);
      });
  }

  renderChart(zones: string[], inscritos: number[], dia1: number[], dia2: number[]) {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: zones,
        datasets: [
          {
            label: 'Inscritos',
            data: inscritos,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Asistencia Día 1',
            data: dia1,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Asistencia Día 2',
            data: dia2,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
