# Poll

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Notes

## Installation

- CSS
- No SSR/SSG

## Create model / Service cmd

- `ng generate interface poll --type=models`

- `ng generate service poll --skip-tests`

Service will allow HTTP requests for polls allow the app to interace with backend API

## Create component

`ng generate component poll --skip-tests`

## Making changes in Tree to show Poll

`app.component.ts`

```ts
@Component({
  selector: "app-root",
  imports: [PollComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "poll";
}
```

`app.component.html`

```ts
<app-poll></app-poll>
```

And then it will show Poll UI

## Bootstrap

```bash
npm i bootstrap
```

and then `angular.json`

```json
            "styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
            ],
```

Need to copy 2 places there.

## Appconfig.ts

Add provideHTTPClient() to see our page. CORS policy needs to be fixed

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
```

`poll.component.html`

```html
<div>
  <div *ngFor="let poll of polls"></div>
</div>
```

\*ngfor - ngfor is used to loop through the polls

`poll.component.ts`

```ts
Component({
  selector: "app-poll",
  imports: [CommonModule, FormsModule],
  templateUrl: "./poll.component.html",
  styleUrl: "./poll.component.css",
});
```

Add commonModule to enable ngFor
Also add FormsModule to handle Forms later.
# polling-app-fe
