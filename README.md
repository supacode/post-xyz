# POST CRUD

This app built using Vite/VueJS3, styled with Tailwind and uses Vue Query for data fetching.

## Installation

- CD into project root directory `npm install`.
- `npm start` to run project.

## Folder Structure 🗂️

- The frontend codebase is organized using a modular architecture, with each feature or component having its own directory containing the necessary files. This structure promotes code reusability, maintainability, and scalability.
- Each component has it's own directory containing the component file, styles. This encapsulation allows for better organization and isolation of component-specific logic and assets.

## One Function Per File 📁

1. **Enhanced Readability and Maintainability**: By isolating functions in separate files, other engineers can quickly understand what each function does without wading through unrelated code.

2. **Improved Testability**: We can also test our functions easier when each function is isolated. We can import a single function into our test files without worrying about side effects or complex dependencies that might be present in a file containing multiple functions.

3. **Easier Version Control**: When functions are segregated, changes to one function result in modifications to a single file. This isolation simplifies tracking changes in Git, making it easier to identify when and why a particular function changed.

4. **Better Reusability**: With our functions decoupled into separate files, reusing a function in a different part of the application or even across projects becomes much simpler. This modularity promotes code reuse and helps in building a consistent and DRY (Don't Repeat Yourself) codebase.

5. **Simplified Dependency Management**: In a modular architecture, dependencies can be tracked and managed at the file level. This precision aids in understanding the dependency graph of the application, potentially reducing bundle sizes and improving load times.

### State Management 📦

We are using Vue Query for data fetching and state management, we opted for this over traditional state management solutions like Vuex or Pinia. Some reason why we made this choice are:

1. **Simplified Data Fetching and Caching**: Vue Query provides built-in mechanisms for fetching, caching, and updating data, eliminating the need for boilerplate code to manage these processes manually. It automatically handles data fetching lifecycles, caching, background updates, and stale data, providing a more efficient and streamlined development experience.

2. **Server State Separation**: Unlike traditional global state management solutions, Vue Query focuses on managing server state, which is inherently asynchronous and external to the application. This clear separation allows for more predictable state management, as it decouples UI state (managed locally) from server state (managed by Vue Query), reducing complexity and improving maintainability.

3. **Improved Performance**: Vue Query's caching and background updating features can significantly improve the user experience by reducing loading times and seamlessly updating the UI with fresh data. By intelligently managing data-fetching operations, Vue Query can optimize application performance and minimize unnecessary server requests.

4. **Reduced Boilerplate**: By handling data fetching and caching internally, Vue Query reduces the amount of boilerplate code developers need to write. This allows us to focus on building features and business logic rather than worrying about the intricacies of state management and data synchronization.

## Improvements

### Testing 🧪

This point is really important and will be marked as a @TODO:
We can improve the tests by adding more test for composables, and scenarios to ensure the application is robust and reliable. We can also add more integration tests to cover the entire application flow.

### Pagination

Backend API Modification:
We'll ensure that our backend API can handle requests for paginated data. Currently, the backend has no proper support for pagination.
Usually this involves accepting `page` and `limit` (or `offset` and `limit`) parameters and returning the current slice of data along with metadata necessary for pagination, such as `total records`.
