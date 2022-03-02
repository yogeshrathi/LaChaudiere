import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    window.history.back()
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
