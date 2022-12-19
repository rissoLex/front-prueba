import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { cil3d, cilVector} from '@coreui/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public iconSet: IconSetService
  ) {
    iconSet.icons = { cil3d,cilVector };
  }


}
