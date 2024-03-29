import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('app/main/main.module')
      .then(module => module.MainModule),
  },
  /*{
    // template routing
    path: 'template',
    children: [
      {
        path: 'pages',
        loadChildren: () => import('app/pages/pages.module')
          .then(m => m.PagesModule),
      },
      {
        path: 'auth',
        component: NbAuthComponent,
        children: [
          {
            path: '',
            component: NbLoginComponent,
          },
          {
            path: 'login',
            component: NbLoginComponent,
          },
          {
            path: 'register',
            component: NbRegisterComponent,
          },
          {
            path: 'logout',
            component: NbLogoutComponent,
          },
          {
            path: 'request-password',
            component: NbRequestPasswordComponent,
          },
          {
            path: 'reset-password',
            component: NbResetPasswordComponent,
          },
        ],
      },
    ],
  },*/
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
