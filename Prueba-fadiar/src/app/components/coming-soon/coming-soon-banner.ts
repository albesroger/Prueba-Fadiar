import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon-banner',
  templateUrl: './coming-soon-banner.html',
})
export class ComingSoonBannerComponent implements OnInit {
  time = { days: '3', hours: '00', minutes: '00', seconds: '00' };

  constructor() {
    this.time = new Date().toTimeString() as any;
  }

  ngOnInit() {}
}
