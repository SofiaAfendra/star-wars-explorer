# Star Wars Explorer

## Description

This is a web application that allows users to search for Star Wars characters and view their details. It also provides the choice to store and display your favorite options.
The application uses the [Star Wars API](https://swapi.dev/) to fetch the data.

## Build Tool

This project was built using Vite.js. Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.

### Advantages of using Vite:

- Fast development server
- Lightning fast hot module replacement
- No bundling in development
- Optimized production build

## Installation

Run the following commands:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Technologies Used

- React.js: A JavaScript library for building declarative and component-based user interfaces.
- Material-UI: A popular React UI library, that provides pre-designed components.
- React Virtuoso: A library that provides a virtualized list component for React and infinite scrolling.
- Redux Toolkit: A library that simplifies the process of managing state in React applications.
- Redux Observable (RxJS): A library that provides an effective way to handle asynchronous actions in Redux. It uses the power of observables to manage side effects.

## Model View Controller (MVC) Architecture

The application employs the MVC (Model-View-Controller) architectural pattern, enhanced by the unidirectional data flow supported by Redux. This pattern helps achieve separation of concerns.

- Model: The data layer, responsible for managing the application's data. In this application, there is a clear distinction between the app data (state) and the business logic. Redux manages the application's state and provides a single source of truth for the entire application. RxJS is used to handle the business logic aspect and asynchronous actions.
- View: The presentation layer, responsible for rendering the user interface. In this application, the view is implemented using React.
- Controller: The logic layer, responsible for handling user input and updating the model. In this application, the controller is implemented using Redux reducers. Every change in the application's state occurs within a reducer, ensuring a single point of failure.

### Benefits of this Architecture

The proposed architecture offers several key benefits:

- Ease of Reasoning: By dividing the application into smaller, manageable layers, we can focus on each layer independently, simplifying problem-solving.
- Substitution: Layers can be easily replaced with alternative implementations. Changes remain contained within a layer, preventing them from affecting other parts of the application. This makes refactoring easier and less intrusive.
- Evolution: The architecture supports evolution as the software matures and requirements change.
- Decoupling: Dependencies between layers are controlled and unidirectional. This low coupling, combined with high cohesion, reduces complexity management to small, isolated parts of the application.
- Debugging: With well-defined responsibilities for each layer, it is easier to trace and fix problems.

## Presentational and Container Components Pattern

The application follows the Presentational and Container Components pattern. This pattern separates components into two categories:

- Presentational Components are concerned with how things look. They receive data and callbacks exclusively via props and are generally stateless. They are not aware of the application's state or how the data is loaded.

- Container Components are concerned with how things work. They are responsible for handling state, and passing data and callbacks down to Presentational Components. They are often stateful and are connected to the Redux store. In this application, they are implemented as higher-order components (HOCs).

This pattern helps to maintain a clear separation of concerns and makes the codebase easier to understand and maintain.

## Folder Structure

The project is structured as follows:

```
star-wars-explorer/
├── public/
├── src/
│   ├── components/
│   │    ├── header/
│   │    │   ├── Header.jsx
│   │    │   ├── withHeaderProps.jsx
│   │    │   ├── styles.js.js
│   │    │   └── index.js
│   │    ├── main/
│   │    │   ├── Main.jsx
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    ├── sidebar/
│   │    │   ├── Sidebar.jsx
│   │    │   ├── withSidebarProps.jsx
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    ├── snackbar/
│   │    │   ├── Snackbar.jsx
│   │    │   ├── withSnackbarProps.jsx
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    ├── ui-setup/
│   │    │   ├── UIsetup.jsx
│   │    │   └── index.js
│   │    └── index.js
│   ├── library/
│   │    ├── persistState.js
│   │    ├── withModelProps.js
│   │    └── index.js
│   ├── models/
│   │    ├── favorites/
│   │    │   ├── actions.js
│   │    │   ├── selectors.js
│   │    │   ├── slice.js
│   │    │   └── index.js
│   │    ├── search-results/
│   │    │   ├── actions.js
│   │    │   ├── epics.js
│   │    │   ├── selectors.js
│   │    │   ├── slice.js
│   │    │   └── index.js
│   │    └── snackbar/
│   │    │   ├── actions.js
│   │    │   ├── selectors.js
│   │    │   ├── slice.js
│   │    │   └── index.js
│   ├── store/
│   │    ├── rootReducer.js
│   │    ├── store.js
│   │    └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.js
├── .gitignore
├── package.json
├── README.md
└── ...
```

Folder and Files Descriptions:

- `src/`: Contains the source code of the application.
  - `components/`: Contains the React components of the application.
    - `header/`: Contains the Header component, including the filter and search functionality.
    - `main/`: Contains the Main component, which displays the details of a selected option.
    - `sidebar/`: Contains the Sidebar component, which displays the search results and favorites.
    - `snackbar/`: Contains the Snackbar component, which displays messages to the user such as errors.
    - `ui-setup/`: Contains the UIsetup component, which sets up Material-UI and store Provider.
  - `library/`: Contains utility functions, such as the persistState custom middleware that connects the local storage with the Redux store and the HOC withModelProps that enhances a component with actions and state from Redux.
  - `models/`: Contains the Redux slices and related files.
    - `favorites/`: Contains the Redux slice, actions and selectors for managing favorites.
    - `search-results/`: Contains the epic middleware and Redux slice, actions and selectors for fetching and managing search results.
    - `snackbar/`: Contains the Redux slice, actions and selectors for managing the snackbar.
  - `store/`: Contains the Redux store configuration.
  - `App.jsx`: The main component of the application.
  - `main.jsx`: The entry point of the application.
  - `styles.js`: Contains the global styles of the application.
