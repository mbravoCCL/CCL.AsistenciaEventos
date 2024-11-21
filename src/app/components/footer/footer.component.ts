import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() lastTotalResultados!: number;
  @Input() pageSize!: number;
  @Input() currentPage!: number;
  

  get totalPages(): number {
    return Math.ceil(this.lastTotalResultados / this.pageSize);
  }
}
