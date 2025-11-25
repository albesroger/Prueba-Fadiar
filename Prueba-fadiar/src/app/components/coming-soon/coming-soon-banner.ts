import { Component, OnDestroy, OnInit } from '@angular/core';
import { Time } from '../../models/time.model';

@Component({
  selector: 'app-coming-soon-banner',
  templateUrl: './coming-soon-banner.html',
})
export class ComingSoonBannerComponent implements OnInit, OnDestroy {
  time: Time = { days: '00', hours: '00', minutes: '00', seconds: '00' };

  private targetDate: Date = new Date('2025-11-30T23:59:59');
  private intervalId: any;

  constructor() {}

  ngOnInit() {
    console.log(
      'ComingSoonBannerComponent ngOnInit — targetDate:',
      this.targetDate
    );
    this.updateTimeLeft();
    this.intervalId = setInterval(() => this.updateTimeLeft(), 1000);
  }

  ngOnDestroy(): void {
    
  }

  private updateTimeLeft(): void {
    const now = Date.now();
    const diff = this.targetDate.getTime() - now;

    if (diff <= 0) {
      this.time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.time = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }
}
