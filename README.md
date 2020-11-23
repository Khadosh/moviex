## Live Demo
https://elastic-pike-5f8c2d.netlify.app/

## How To Run
```sh
$ cd moviex
$ yarn install
$ yarn start
```

## Available Scripts
- "start": Initializes the application
- "build": Creates a bundle
## Required
- Node >= v10.16.3
- Yarn >= v1.22.4

## Decition Making
- I decided to use a template for create-react-app using typescript an redux slices.
- I loved the new implementation of redux, specially how clean it is, so I decided to go for it instead of the old school.
- I chose styled-components for many reasons, but the one I like most is because it can handle the styling "logic" into a separate component and just inject props into to fire how to behave, instead of having complex (hard-to-read) implementations on the component to change the layout according the combination of viewport + application state.
- I followed the dry principle (don't repeat yourself) by adding redux selectors to remove code duplication on components
