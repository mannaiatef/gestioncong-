import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-auth-animation',
  templateUrl: './auth-animation.component.html',
  styleUrls: ['./auth-animation.component.css'],
  animations: [
    trigger('characterAnimation', [
      state('idle', style({
        transform: 'translateY(0)'
      })),
      state('jump', style({
        transform: 'translateY(-20px)'
      })),
      transition('idle <=> jump', [
        animate('0.3s')
      ]),
      transition('* => wave', [
        animate('0.5s', style({ transform: 'rotate(0deg) scale(1.2)' })),
        animate('0.5s', style({ transform: 'rotate(5deg) scale(1.2)' })),
        animate('0.5s', style({ transform: 'rotate(-5deg) scale(1.2)' })),
        animate('0.5s', style({ transform: 'rotate(0deg) scale(1)' }))
      ])
    ])
  ]
})
export class AuthAnimationComponent implements OnInit {
  animationState = 'idle';

  constructor() { }

  ngOnInit(): void {
    this.randomAnimation();
  }

  randomAnimation(): void {
    setInterval(() => {
      const animations = ['jump', 'wave'];
      const randomIndex = Math.floor(Math.random() * animations.length);
      this.animationState = animations[randomIndex];
      
      // Reset to idle after animation completes
      setTimeout(() => {
        this.animationState = 'idle';
      }, 2000);
    }, 5000);
  }
}