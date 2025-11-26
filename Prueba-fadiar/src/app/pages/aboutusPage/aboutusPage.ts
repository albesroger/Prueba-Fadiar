import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";
import { Billetes } from "../../components/billetes/billetes";
import { UltimosProductos } from "../../components/ultimosProductos/ultimosProductos";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";

interface StatItem {
  value: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-aboutus-page',
  imports: [CommonModule, DownloadAppBanner, Billetes, UltimosProductos, BreadcrumbComponent],
  templateUrl: './aboutusPage.html',
})
export class AboutusPage {
  stats: StatItem[] = [
    {
      value: '18.6k',
      title: 'Lorem ipsum Sit amet consectetur.',
      description: 'vel sit id at.',
    },
    {
      value: '98%',
      title: 'Lorem ipsum Sit amet consectetur.',
      description: 'At tristique est adipiscing pellentesque vel sit id at.',
    },
    {
      value: '234+',
      title: 'Lorem ipsum Sit amet consectetur.',
      description: '',
    },
    {
      value: '63.6k',
      title: 'Lorem ipsum Sit amet consectetur.',
      description: 'At pellentesque vel sit id at.',
    },
  ];
}
