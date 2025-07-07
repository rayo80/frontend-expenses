import { Component } from '@angular/core';
import { ReportViewerService } from './reports-viewer.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './reports-viewer.component.html',
  styleUrls: ['./reports-viewer.component.scss']
})
export class ReportViewerComponent {
  reportType: string;
  reportTypes = [
    { value: 'ventas', label: 'Reporte de Ventas' },
    { value: 'compras', label: 'Reporte de Compras' },
    // agrega más tipos según tu backend
  ];

  errorMessage: string | null = null;
  loading = false;

  // Para visualizar el Excel
  excelData: any[] = [];
  excelHeaders: string[] = [];
  showViewer = false;
  excelFileUrl: string | null = null;

  constructor(private reportViewerService: ReportViewerService) {}

  onSubmit() {
    if (this.reportType) {
      this.loading = true;
      this.fetchReport(this.reportType);
    }
  }

  fetchReport(type: string) {
    this.reportViewerService.getReport(type).subscribe(
      (response: Blob) => {
        // Leer el archivo Excel
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          this.excelHeaders = jsonData[0] as string[];
          this.excelData = jsonData.slice(1);
          this.showViewer = true;
          this.loading = false;

          // Para descarga posterior
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          this.excelFileUrl = window.URL.createObjectURL(blob);
        };
        reader.readAsArrayBuffer(response);
      },
      error => {
        this.errorMessage = 'Error al obtener el reporte';
        this.loading = false;
      }
    );
  }

  descargarExcel() {
    if (this.excelFileUrl) {
      const a = document.createElement('a');
      a.href = this.excelFileUrl;
      a.download = `${this.reportType}_report.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  volver() {
    this.showViewer = false;
    this.excelData = [];
    this.excelHeaders = [];
    this.excelFileUrl = null;
  }
}