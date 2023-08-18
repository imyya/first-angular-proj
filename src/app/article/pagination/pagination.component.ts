import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() last: number = 0;

  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();
  @Output() goToPageClicked = new EventEmitter<number>();

  // Emit events for pagination functions
  onNextClicked() {
    this.nextClicked.emit();
  }

  onPreviousClicked() {
    this.previousClicked.emit();
  }

  onGoToPageClicked(page: number) {
    this.goToPageClicked.emit(page);
  }


  
}
