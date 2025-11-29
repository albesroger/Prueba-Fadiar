import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon-banner',
  templateUrl: './coming-soon-banner.html',
})
export class ComingSoonBannerComponent implements OnInit, OnDestroy {
  time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  private countdownInterval?: ReturnType<typeof setInterval>;
  private targetDate = this.getDefaultTarget();

  ngOnInit(): void {
    this.updateTimeRemaining();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.updateTimeRemaining();
    }, 1000);
  }

  private updateTimeRemaining(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    this.time = {
      days: this.padZero(days),
      hours: this.padZero(hours),
      minutes: this.padZero(minutes),
      seconds: this.padZero(seconds),
    };
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private getDefaultTarget(): Date {
    // Set a default target 30 days from now; adjust here if a specific launch date is needed.
    const now = new Date();
    return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}
