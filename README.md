## Problem definition:

In Switzerland, the names of the locations we write next to the postcode are not exactly the names of the municipality to which the address belongs.

Consider the following examples:

- ● 69.8% of the addresses `8806 Bäch SZ` belongs to the municipality Freienbach;
- ● the rest 30.2% of the addresses `8806 Bäch SZ`belongs to the municipality Wollerau.

Additionally,

- ● 100% of the addresses in `6343 Buonas` belongs to the municipality Risch;
- ● 100% of the addresses in `6343 Rotkreuz` belongs to the municipality Risch;
- ● 100% of the addresses in `6343 Risch` also belongs to the municipality Risch.

This application expects the user to input a postcode. The system processed the user input and tts corresponding addresses and municipalities are shown in two different fields.

Using the postcodes mentioned above as an example, if the user insert `8806` postcode the field `location` in the application would be prefilled with `Bäch SZ` and a dropdown with multiple options (`Freienbach` and `Wollerau`) will be available in the municipality field.

## Addresses data

The Data used by this application is processed from [here](https://www.bfs.admin.ch/bfsstatic/dam/assets/4242620/master)

## Installation

Assuming you have Docker installed, execute `docker-compose up --build` in the root directory. You should then be able to access the application on `http://localhost:3000`

## Backend - API endpoint

The only endpoint built is accessible with a GET request on `http://localhost:4000/address/postcode-number/:number`

## Database - Adminer

You may query the database via Adminer - `http://localhost:8080/` user/password `root`/`secret`
