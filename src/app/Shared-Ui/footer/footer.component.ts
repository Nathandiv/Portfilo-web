import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Import IonicModule for ion-icon
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule, RouterModule], // Add IonicModule and RouterModule to imports
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}
