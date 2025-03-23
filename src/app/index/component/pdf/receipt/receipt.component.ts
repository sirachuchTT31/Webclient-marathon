import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {
  @Input() data: any;


  generatePDF() {
    const contentReceipt = document.getElementById('content-receipt');

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

      const filename = `RECEIPT-${currentTime}-${this.data.EventJoin.Invoice.Payment[0].payment_code}.pdf`;
      pdf.save(filename);
    });
  }
}
