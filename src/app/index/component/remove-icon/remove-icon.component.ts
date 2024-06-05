import { Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-remove-icon',
  templateUrl: './remove-icon.component.html',
  styleUrls: ['./remove-icon.component.scss']
})
export class RemoveIconComponent {
  @Input() customStyle = {
    top: '',
    right: ''
  }
  @ViewChild('icon') customIcon!: ElementRef;
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if(this.customStyle){
      this.renderer.setStyle(this.customIcon?.nativeElement, 'top', this.customStyle.top)
      this.renderer.setStyle(this.customIcon?.nativeElement, 'right', this.customStyle.right)
    }
  }
}
