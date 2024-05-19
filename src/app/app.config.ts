import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'essos-13593',
        appId: '1:234509148552:web:19e5316606e6a5eaeb1a3d',
        storageBucket: 'essos-13593.appspot.com',
        apiKey: 'AIzaSyCP29nVcnjbsOXNeSXVZgRlVjhCJNCcYgY',
        authDomain: 'essos-13593.firebaseapp.com',
        messagingSenderId: '234509148552',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
