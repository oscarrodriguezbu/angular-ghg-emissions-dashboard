# GhgEmissionsDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve --port=4069 -o
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

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

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


## Screenshots

<img style="margin-bottom: 20px;" src="screenshots/image1.png" alt="Home Screenshot">
<img style="margin-bottom: 20px;" src="screenshots/image2.png" alt="Dashboard Screenshot">
<img style="margin-bottom: 20px;" src="screenshots/image3.png" alt="Dashboard Screenshot">
<img style="margin-bottom: 20px;" src="screenshots/image4.png" alt="Dashboard Screenshot">
<img style="margin-bottom: 20px;" src="screenshots/image5.png" alt="Dashboard Screenshot">

## Improvements & Future Enhancements

* Create a generic, reusable component to avoid duplicated logic across the three pages.
* Move the data fetching logic to a higher level so the JSON data is not reloaded every time the route changes or implement a caching strategy.
* Use query parameters to preserve the application state when navigating between routes.
