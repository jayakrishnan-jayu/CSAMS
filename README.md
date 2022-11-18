# CSAMS
CSA Management System

## Requirement
1. git
2. Docker
3. Your favourite ❤️ IDE 

## Installation

You can run CSAMS with or without docker. (Using Docker is recomended)

1. Install Docker Desktop

    https://docs.docker.com/desktop/

2. Clone this repository
    ```bash
    git clone git@github.com:jayakrishnan-jayu/CSAMS.git
    ```
    or if you don't have ssh enabled
    ```bash
    git clone https://github.com/jayakrishnan-jayu/CSAMS.git
    ```

3. Build the docker image
    ```bash
    cd CSAMS
    docker-compose build
    docker-compose up
    ```
    If everything works out, you can visit http://localhost to see the website

4. Open up docker backend container CLI
    ```bash
    python manage.py migrate
    sh fake-data.sh 
    // to create fake data
    ```


|  Route | What it does |
|---|---|
|  localhost/api/graphql | API endpoint and graphql playground  | 
| localhost/api/admin  |  Django admin panel |   

