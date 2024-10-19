import { Component, Input, SimpleChanges } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Angsana } from 'src/assets/fonts/angsana';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  @Input() headers: string[] = [];
  @Input() body: string[] = [];
  @Input() footer: string[] = [];
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.createDocument(changes['body']);
  }

  createDocument(body?: any) {
    const mock = [
      {
        number: 2,
        product: 'ยาสระผม',
        amount: 1,
        price: 50
      },
      {
        number: 3,
        product: 'น้ำดื่ม',
        amount: 1,
        price: 50
      },
      {
        number: '1',
        product: 'น้ำยาล้างจาน',
        amount: '1',
        price: '50'
      },
      {
        number: 2,
        product: 'ยาสระผม',
        amount: 1,
        price: 50
      },
      {
        number: 3,
        product: 'น้ำดื่ม',
        amount: 1,
        price: 50
      },
    ]
    const doc = new jsPDF();
    doc.addFileToVFS("angsanab.ttf", Angsana.angsanaB)
    doc.addFont("angsanab.ttf", "Angsana", 'normal')
    doc.setFont("Angsana")

    const dataBody = mock.map(item => [
      { content: item.number, styles: { fontSize: 14 } },
      { content: item.product, styles: { fontSize: 14 } },
      { content: item.amount, styles: { fontSize: 14 } },
      { content: item.price, styles: { fontSize: 14 } },
    ]);

    let finalY: any;

    autoTable(doc, {
      headStyles: { lineColor: '#fff', minCellHeight: 0, lineWidth: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2 } },
      bodyStyles: { lineColor: '#000', minCellHeight: 0, lineWidth: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2 } },
      footStyles: { lineColor: '#000', minCellHeight: 0, lineWidth: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2 } },
      head: [
        [
          {
            content: ''
          },
          {
            content: ''
          },
          {
            content: ''
          },
          {
            content: 'ใบแจ้งหนี้', styles: { fontSize: 42, valign: 'middle', halign: 'right', },
          },
        ],
        [
          {
            content: ''
          },
          {
            content: ''
          },
          {
            content: ``
          },
          {
            content: `เลขใบแจ้งหนี้ INV-1150`, styles: { fontSize: 16, valign: 'middle', halign: 'right' }
          },
        ],
        [
          {
            content: 'ผู้ออก', styles: { fontSize: 14, valign: 'top', halign: 'left', }
          },
          {
            content: 'Mr.Falling Downs\n บริษัท ปิงปอง จำกัด \n บ้านเลขที่ 123 หมู่ 20 ต.เมืองไทย จ.กรุงเทพมหานคร 44200', styles: { fontSize: 14, valign: 'top', halign: 'left', minCellHeight: 30 }
          },
          {
            content: ''
          },
          {
            content: ''
          }
        ],
      ],

      // Table
      body: [
        [
          {
            content: 'ลำดับ', styles: { fontSize: 14, valign: 'middle', halign: 'left' }
          },
          {
            content: 'รายการ', styles: { fontSize: 14, valign: 'middle', halign: 'left' }
          },
          {
            content: 'จำนวน', styles: { fontSize: 14, valign: 'middle', halign: 'left' }
          },
          {
            content: 'ราคา', styles: { fontSize: 14, valign: 'middle', halign: 'left' , }
          },
        ],
        ...dataBody
      ],
      styles: {
        lineWidth: 0,
        font: 'Angsana',
        fontStyle: 'normal',
      },
      didDrawCell: function (data) {
        const totalPages = doc.getNumberOfPages();
        if (doc.getCurrentPageInfo().pageNumber === totalPages) {
          finalY = data.cursor?.y;  // จุด Y ที่ตารางจบในหน้าสุดท้าย
        }
      },
      theme: "plain",
      tableLineWidth: 0,
    });
    
    // Footer bill
    const footerText = `ราคารวม : 550,000 บาท`
    const pageWidth = doc.internal.pageSize.width;
    const footerTextWidth = doc.getTextWidth(footerText);
    const footerX = (pageWidth - footerTextWidth - 10);
    doc.setFontSize(14)
    doc.text(`จำนวน : 20 ชิ้น` ,footerX , finalY + 20 )
    doc.text(footerText, footerX, finalY + 25);
    this.addPageNumbers(doc);


    window.open(doc.output("bloburl"));
  }

  addPageNumbers(doc: any) {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`ขอบคุณลูกค้าทุกท่านที่ใช้บริการ Marathon`, (doc.internal.pageSize.getWidth() / 2) - 20, doc.internal.pageSize.getHeight() - 10);
      doc.text(`หน้า ${i} / ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);
    }
  };
}
