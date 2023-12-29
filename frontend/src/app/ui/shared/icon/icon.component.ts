import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'icon[name]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit, OnChanges {
  private static mapIcons = new Map<string, any>();

  @Input()
  name!: string;

  public svgContent?: any;

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadIcon(this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['name'] &&
      changes['name'].currentValue &&
      !changes['name'].firstChange
    ) {
      this.loadIcon(changes['name'].currentValue);
    }
  }

  private loadIcon(name: string): void {
    this.svgContent = undefined;

    if (IconComponent.mapIcons.has(name)) {
      this.svgContent = IconComponent.mapIcons.get(name);
      return;
    }

    firstValueFrom(
      this.http.get(`assets/icons/${name}.svg`, { responseType: 'text' })
    )
      .then((response) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(response);
        IconComponent.mapIcons.set(name, this.svgContent);
      })
      .catch((e) => {});
  }
}
