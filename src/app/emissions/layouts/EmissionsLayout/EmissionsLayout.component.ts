import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-emisions-layout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './EmissionsLayout.component.html',
})
export class EmissionsLayoutComponent {}
