import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;
  selectedLanguage:any;

  constructor(public translate: TranslateService, public generalService: GeneralService, private storageService: StorageService) {
    // Register translation languages
    translate.addLangs(['en', 'fr']);
    // Set default language
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    localStorage.getItem('r') === 'true' ? this.isAdmin = true : this.isAdmin = false;

    this.generalService.isUserChange.subscribe(res => {
      if (res) {
        localStorage.getItem('r') === 'true' ? this.isAdmin = true : this.isAdmin = false;
      }
    })

    const language = this.storageService.getCookie('language');
    if (language) {
        if (language === 'fr') {
            this.generalService.selectedLanguage = 'fr';
            this.translate.use('fr');
        } else {
            this.generalService.selectedLanguage = 'en';
            this.translate.use('en');
        }
    }
    this.selectedLanguage = this.generalService.selectedLanguage === 'fr' ? 'English' : 'Français';
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  changeLanguage(): void {
    if (this.generalService.selectedLanguage === 'en') {
        this.generalService.selectedLanguage = 'fr';
        this.translate.use('fr');
        this.storageService.setCookie('language', 'fr');
        setTimeout(() => {
            window.location.href = '';
        }, 500);
    } else {
        this.generalService.selectedLanguage = 'en';
        this.translate.use('en');
        this.storageService.setCookie('language', 'en');
        setTimeout(() => {
            window.location.href = '';
        }, 500);
    }
    this.selectedLanguage = this.generalService.selectedLanguage === 'fr' ? 'English' : 'Français';
}

  showNav = () => {
    $('body').toggleClass('menu-open');
  }

}
