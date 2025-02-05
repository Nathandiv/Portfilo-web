import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // ViewChild to reference mobile menu
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  // Method to toggle the hidden class on the mobile menu
  toggleMobileMenu(): void {
    if (this.mobileMenu) {
      this.mobileMenu.nativeElement.classList.toggle('hidden');
    }
  }
}
