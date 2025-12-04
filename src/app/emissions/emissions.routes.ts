import { Routes } from '@angular/router';
import { EmissionsLayoutComponent } from './layouts/EmissionsLayout/EmissionsLayout.component';
import { ByCountryPage } from './pages/by-country-page/by-country-page';
import { ByActivityPage } from './pages/by-activity-page/by-activity-page';
import { ByEmissionTypePage } from './pages/by-emission-type-page/by-emission-type-page';


export const EmisionsRoutes: Routes = [
  {
    path: '',
    component: EmissionsLayoutComponent,
    children: [
      {
        path: 'by-country',
        component: ByCountryPage,
      },
      {
        path: 'by-activity',
        component: ByActivityPage,
      },
      {
        path: 'by-emission-type',
        component: ByEmissionTypePage,
      },

      // {
      //   path: 'by/:code',
      //   component: CountryPageComponent,
      // },

      {
        path: '**',
        redirectTo: 'by-country',
      },
    ],
  },
];

export default EmisionsRoutes;
