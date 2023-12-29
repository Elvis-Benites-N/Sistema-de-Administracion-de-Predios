import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {
  public error: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams && queryParams['usuario'] && queryParams['token']) {
      this.session(queryParams['usuario'], queryParams['token']);
    } else {
      this.error = true;
    }
  }

  async session(username: string, sessionToken: string) {
    try {
      await this.authService.session({
        username,
        sessionToken,
      });

      this.router.navigateByUrl('/');
    } catch (error) {
      this.error = true;
    }
  }
}
