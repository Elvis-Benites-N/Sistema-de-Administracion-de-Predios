import { Component, Inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { APP_CONFIG, Config } from './core/config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(APP_CONFIG)
    readonly config: Config
  ) {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof ActivationEnd),
        filter((evento: any) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      )
      .subscribe((data) => {
        const titleText = data['webtitle'];
        const descriptionText = data['webdescription'];

        const metaTag: MetaDefinition = {
          name: 'description',
          content: descriptionText,
        };

        this.title.setTitle(titleText);
        this.meta.updateTag(metaTag);
      });
  }
}
