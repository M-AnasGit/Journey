# Journey

Journey is a dynamic mobile app designed for centralized learning in a gamified environment. Inspired by Duolingo, Journey offers a wide variety of courses and quizzes to enhance users' knowledge through a fun and interactive approach. What sets Journey apart is its community-driven features, enabling users to create and share their own courses. As these courses gain popularity, creators have the opportunity to earn real-world money based on their success.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Directory Structure](#directory-structure)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Features

-   **Gamified Learning**: Engage with courses and quizzes that make learning enjoyable.
-   **User-Generated Content**: Create and share your own courses with the community.
-   **Earnings for Creators**: Earn real-world money based on the popularity of your courses.
-   **Centralized Learning**: Access a variety of subjects and topics in one place.
-   **Community Engagement**: Interact with other learners and share knowledge.

## Technologies Used

-   **Frontend**:
    -   [React Native](https://reactnative.dev/) - For building the mobile application.
-   **Backend**:

    -   [Node.js](https://nodejs.org/) - For server-side development.
    -   [Express.js](https://expressjs.com/) - A web application framework for Node.js.

-   **Database**:
    -   [MySQL](https://www.mysql.com/) - For data storage and management.

## Installation

To set up the Journey app locally, follow these steps:

### Prerequisites

-   Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
-   Install [MySQL](https://www.mysql.com/) and set up a database for the application.

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/M-AnasGit/journey.git
    cd journey/Front
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the Expo application:

    ```bash
    npx expo start
    ```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd journey/Back
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the Expo application:

    ```bash
    node index.js
    ```

### Instructions for Customization

-   Env file in the front end for the expo parameters
-   Env file in back end for db, email parameters and JWT secret key.
