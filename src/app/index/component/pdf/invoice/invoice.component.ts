import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {
    console.log(JSON.stringify(this.data))
  }

  generatePDF() {
    const contentReceipt = document.getElementById('content-invoice');

    html2canvas(contentReceipt!, {
      scale: 3,
      useCORS: true,
      logging: false,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

      const currentTime = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];

      const filename = `INVOICE-${currentTime}-${this.data.EventJoin?.Invoice?.invoice_code}.pdf`;
      pdf.save(filename);
    });
  }
}
