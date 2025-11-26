import { Component } from '@angular/core';
import { FaqItem } from '../../model/faqItem.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-questions',
  imports: [CommonModule],
  templateUrl: './faqQuestions.html',
})
export class FaqQuestions {
  faqs: FaqItem[] = [
    {
      question: '¿Lorem ipsum dolor sit amet. Ut quaerat soluta?',
      answer:
        'Lorem ipsum dolores fugiat et voluptatum quis eum voluptates quos ut beatae dolores et iste assumenda non beatae quis. Sed vero dolor sit libero ducimus et voluptatibus voluptates. At ullam voluptates eos eligendi harum quo quia quidem ut dicta quia. Qui voluptas voluptates non sequi nihil et obcaecati quibusdam non odit quia.',
    },
    {
      question: '¿Lorem ipsum dolor sit amet. soluta?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at justo non sem placerat vehicula. Donec dignissim orci quis metus fermentum, vitae facilisis lorem ultrices.',
    },
    {
      question: '¿Lorem ipsum dolor sit amet. ?',
      answer:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      question: '¿Lorem ipsum dolor sit amet. Ut quaerat soluta?',
      answer:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    },
    {
      question: '¿Lorem ipsum dolor sit amet. soluta?',
      answer:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.',
    },
  ];

  openIndex: number | null = 1; // por defecto el segundo abierto como en el diseño

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}
