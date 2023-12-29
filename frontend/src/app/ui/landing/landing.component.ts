import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APP_CONFIG, Config } from 'src/app/core/config/config';

@Component({
  standalone: true,
  selector: 'landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public urlSSO: string;
  constructor(
    @Inject(APP_CONFIG)
    readonly config: Config
  ) {}

  ngOnInit(): void {
    this.urlSSO = `${this.config.sso.frontendURL}?sistema=${this.config.sso.sistemaPublicKey}`;
  }
}
