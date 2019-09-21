Tripion
About this project
What is Tripion?
Tripion is trip booking app for national or international trip.In Tripion user apply for trip,Admin send trip for plan.Then,user choose plan for trip.
Directory structure
.
+-- /api [Node.js backend using Express.js, Mongoose] 
|   +-- /config
|       +-- [config files to initialize the API, e.g. environment variables, db config or Express router]
|   +-- /controllers
|       +-- [Express controllers for the REST API]
|   +-- /mail-templates
|       +-- [hbs templates for default e-mails]
|   +-- /models
|       +-- [Mongoose models]
|   +--/validations
|       +--[express Validation]
|   +--/database
|       +--[Database Connection]
|   +-- /services
|       +-- [Different general-purpose services/utils that can be used in controllers or other parts of the API when necessary. E.g. file operations, mailing, throwing errors, etc.]
|   +-- app.js [The main entry point where the app is started/initialized]
Getting started
    • Install a git client (like the git CLI)
    • Install an IDE (like Visual Studio Code, Atom, WebStorm). Or use vim/emacs if you're hardcore. Visual Studio Code is recommended, because it has great commandline integration and Javascript building/debugging features. Manual compilation is also possible with the Gulp CLI.
    • Install NodeJS 10.13.0 or newer.
    • Install MongoDB 3.6.3.
    • Add NODE_PATH to environment variables with value %AppData%\npm\node_modules.
    • Add %AppData%\npm\ to the front of your PATH environment variable.
    • Use your favorite git client to clone the repository.
    • Enter the project folder and run the following commands to get all the right files in the right place.
