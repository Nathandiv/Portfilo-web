import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../Shared-Ui/navbar/navbar.component";
import { FooterComponent } from "../../Shared-Ui/footer/footer.component";
import AOS from 'aos';
import Typed from 'typed.js';
import 'aos/dist/aos.css';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLoading = true;

  ngOnInit(): void {
    // Initialize the loader
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
    // Initialize AOS
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });

    // Initialize Typed.js
    const typed = new Typed('.typed', {
      strings: [
        "System Developer",
        "Full-Stack Developer",
        "Web Developer",
        "Mobile App Developer",
        "Software Developer",
      ],
      typeSpeed: 80,
      backSpeed: 70,
      backDelay: 1500,
      loop: true,
      startDelay: 1000,
    });
  }
}