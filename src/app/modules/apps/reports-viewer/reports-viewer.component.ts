import { Component } from '@angular/core';
import { ReportViewerService } from './reports-viewer.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './reports-viewer.component.html',
  styleUrls: ['./reports-viewer.component.scss']
})
export class ReportViewerComponent {
  reportType: number;
  reportTypes = [
    { value: 'ventas', label: 'Ventas' },
    { value: 1, label: 'Compras' },
    { value: 'money_outputs', label: 'Salidas de Dinero' },
    { value: 'purchase_items', label: 'Items de Compra' },
  ];

  filtersData: any = {};
  errorMessage: string | null = null;
  loading = false;

  // Para visualizar el Excel
  excelData: any[] = [];
  excelHeaders: string[] = [];
  showViewer = false;
  excelFileUrl: string | null = null;

  constructor(private reportViewerService: ReportViewerService) {}

  onChangeReportType(reportType: number) {
    this.reportType = reportType;
    this.showViewer = false;
    this.excelData = [];
    this.excelHeaders = [];
  }

  onChildSubmit(filters) {
    console.log('Received filters from child:', filters);
      // El hijo manda a hacer esto
      this.filtersData = filters;
      this.fetchReport();
  }
  

  fetchReport() {

    const payload = {
      type: this.reportType,
      filters: this.filtersData
    };
    console.log('payload', payload);
    this.reportViewerService.exportReport(payload).subscribe(
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