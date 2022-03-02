import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isAdmin = false;
  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
    localStorage.getItem('r') === 'true' ? this.isAdmin = true : this.isAdmin = false;
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  showNav = () => {
    $( 'body' ).toggleClass( 'menu-open' );
  }

}
