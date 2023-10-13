# Electron Asset Manager

This Electron application provides a simple asset management system allowing users to manage assets and users. The application is built using Electron, utilizing both the main and renderer processes to interact with a SQLite database for data storage.

## How to Run the Application

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone the repository or download the project files.
3. Open a terminal and navigate to the project directory.
4. Install dependencies by running the following command:
   ```
   npm install
   ```
5. Run the application with:
   ```
   npm start
   ```

## Application Structure

### Main Process (`main.js`)

The main process is responsible for creating the main window and managing the application's lifecycle. It handles window creation, IPC communication, and SQLite database interaction.

### Renderer Process (HTML and JavaScript files)

The renderer process comprises HTML and JavaScript files for different views: `assets.html`, `users.html`, `addAssets.html`, `addUsers.html`, `editAssets.html`, `editUsers.html`. Each file contains the user interface and logic for its respective view.

## Features

- **Navigation**: Allows users to switch between the 'Assets' and 'Users' views.
- **Asset Management**: Enables users to view, add, edit, and delete assets.
- **User Management**: Allows users to view, add, edit, and delete users.
- **Database Integration**: Utilizes SQLite to store asset and user data.

## How It Works

1. The `main.js` file initializes the Electron app, creates the main window, sets up IPC communication, and manages database interactions.

2. The application supports various views:
   - **Assets View**: Displays a table of assets, including their details. Users can add, edit, and delete assets. Filters are available to display assets older than 5 years or assets with bookings.
   - **Users View**: Displays a table of users and allows users to add, edit, and delete users.

3. The `preload.js` file exposes functions to the renderer process, allowing communication with the main process and enabling database operations.

4. The `assets.js` and `users.js` files handle populating and managing the tables for assets and users, respectively, in the renderer process.

5. The `addAssets.js`, `addUsers.js`, `editAssets.js`, and `editUsers.js` files manage form submissions and interactions for adding and editing assets and users.

6. The `winChange.js` file allows users to switch between the 'Assets' and 'Users' views.

7. IPC communication is used to interact with the main process for operations such as data insertion, deletion, and navigation between views.

## Dependencies

- **electron**: Framework for building cross-platform desktop apps.
- **sqlite3**: SQLite database driver for Node.js.

## Contributors

- [Stiaan Kleinhans](https://github.com/StiaanK) - Initial contributor



## License

This project is licensed under the [MIT License](LICENSE).
