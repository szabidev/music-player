# Digital Music Library

Welcome to the Digital Music Library project! This application allows users to visualize artists and their albums, delve into albums to view descriptions and lists of songs, and features an autocomplete component for efficient searching.

## Technology Stack

- **Frontend**: React.js, TypeScript
- **Backend**: Node.js
- **Database**: MongoDB
- **Styling**: TailwindCSS for responsive design
- **Testing**: @testing-library/react for UI tests, Jest

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/digital-music-library.git
```

2. Navigate to project:
   `cd digital-music-library`

3. Start the MongoDB service:
   `sudo systemctl start mongod` for linux
   `C:\mongodb\bin\mongod.exe --dbpath "pathToMongoDB\db\data"` for windows (replace with the correct path for MongoDB's data directory path)

4. Start the deveopment server:
   ``npm start`

### Features

> List Artists and Albums: Users can view all artists and their albums.
> Album Details: Clicking on an album displays its description and song list.
> CRUD Operations: Supports creating, reading, updating, and deleting artists and albums.
> Search with Autocomplete: A search box with autocomplete functionality for quick and easy searching.
> Library page: A quick list with songs.
> Favorites: Songs can be favorited in the library, they are listed in the Favorites page

### TODO

> Input Validation: Ensures all user input is validated to prevent SQL injection and XSS attacks.
> HTTPS: Use HTTPS to encrypt data in transit.
> Implement CRUD operations for single song
> Implement unit and integration tests.
> Apply types, switch any types.
