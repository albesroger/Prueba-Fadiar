import { Component } from '@angular/core';
import { FaqQuestions } from '../../components/faqQuestions/faqQuestions';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";
import { ComingSoonBannerComponent } from "../../components/coming-soon/coming-soon-banner";
import { UltimosProductos } from "../../components/ultimosProductos/ultimosProductos";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-faq-page',
  imports: [FaqQuestions, DownloadAppBanner, ComingSoonBannerComponent, UltimosProductos, BreadcrumbComponent],
  templateUrl: './faqPage.html',
})
export class FaqPage {}
