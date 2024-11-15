import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { apiUri } from '../../graphql.config';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './posts/state/posts.effects';
import { postsReducer } from './posts/state/posts.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideApollo(() => {
            const httpLink = inject(HttpLink);
            return {
                link: httpLink.create({
                    uri: apiUri,
                }),
                cache: new InMemoryCache(),
            };
        }),
        provideStore({
            posts: postsReducer,
        }),
        provideEffects([PostsEffects]),
    ]
};
