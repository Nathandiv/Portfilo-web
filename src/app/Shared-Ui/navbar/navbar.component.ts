import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navbarAnimation', [
      state(
        'void', // Represents the state when the element is not in the DOM (*ngIf false)
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'closed', // When *ngIf is true, but we want it collapsed (mobile initially or after close)
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open', // When *ngIf is true and we want it expanded
        style({
          height: '*', // '*' calculates natural height
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      // Transition when element enters the DOM (e.g., *ngIf becomes true for mobile)
      transition('void => open', [
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      // Transition from open to closed (mobile collapse)
      transition('open => closed', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0 })),
      ]),
      // Transition from closed to open (mobile expand)
      transition('closed => open', [
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      // Transition when element leaves the DOM (e.g., *ngIf becomes false)
      transition('open => void', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0 })),
      ]),
       // This transition is useful if state changes while *ngIf removes it
      transition('closed => void', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarOpen = false;
  isDesktop = false; // New property to track desktop state
  private destroy$ = new Subject<void>();
  private readonly MD_BREAKPOINT = 768; // Tailwind's 'md' breakpoint

  ngOnInit() {
    // Initial check on load
    this.checkIsDesktop(window.innerWidth);

    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkIsDesktop(window.innerWidth);
        // If resized to desktop, ensure mobile menu state is closed
        if (this.isDesktop && this.isNavbarOpen) {
          this.isNavbarOpen = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkIsDesktop(width: number) {
    this.isDesktop = width >= this.MD_BREAKPOINT;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    // Only close if it's currently open and we are on mobile
    if (this.isNavbarOpen && !this.isDesktop) {
      this.isNavbarOpen = false;
    }
    // On desktop, links are always visible, no need to toggle
  }
}