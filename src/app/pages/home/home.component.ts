import { Component } from '@angular/core';
import { NavbarComponent } from "../../Shared-Ui/navbar/navbar.component";
import { FooterComponent } from "../../Shared-Ui/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
