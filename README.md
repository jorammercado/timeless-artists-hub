# Timeless Artists Hub

## Project Overview

**Timeless Artists Hub** is a full-stack educational web application that serves as a proof of concept for transforming a large dataset into a structured and usable platform. The application demonstrates a classic one-to-many database architecture with full CRUD functionality and robust error handling across all operations.

Originally developed to explore how a large dataset could be meaningfully integrated into a polished user experience, the project uses curated artwork data to simulate a real-world content-driven application. While educational and foundational in nature, its structure supports potential future use cases in classrooms, museums, or digital galleries.

## Tech Stack

- **Frontend**: React, CSS, Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Deployment**: Netlify (frontend), Render (backend)

## Features

- PostgreSQL-backed database seeded with 14,000+ curated artworks from 50+ notable artists
- Biographical details, genres, and metadata for each artist
- Paginated and sortable tables for browsing both artists and artworks
  - Sort artists by name, birth year, genre, and nationality
  - Sort artworks by name, date created, and style
- Explore artist profiles with bios, genres, and embedded media
- Navigate through detail pages for each artist and artwork
- Full CRUD functionality for both artists and artworks
- Artworks must belong to a known artist in the database
- Comprehensive error handling for invalid inputs or data integrity issues

## Contents

- [Sitemap](#sitemap)
- [Deployed App Access](#deployed-app-access)
- [GitHub Repositories](#github-repositories)
- [Installation and Setup](#installation-and-setup)
- [License](#license)
- [Contact](#contact)

## Sitemap

The navigation bar includes **Home**, **Artists**, **Artworks**, and **New Artist**.

To create an artwork, visit the detail page of an existing artist and use the "New Artwork" option. Each artwork must be associated with an existing artist. If the artist doesn't exist, create the artist first.

```shell
Home
├─ Artists
│   └─ Artist
│       ├── Edit
│       ├── Delete
│       ├── New Artwork
│       └── Artist Artworks
│             └── Artwork
│                 ├── Edit
│                 ├── Delete
│                 └── Back
├── All Artworks
│     └── Artwork
│         ├── Edit
│         ├── Delete
│         └── Back
└── New Artist
```

## Deployed App Access

- **Frontend App on Netlify**: [https://artistshub.netlify.app](https://artistshub.netlify.app)
- **Backend Server on Render**: [https://timeless-artists-hub-server.onrender.com](https://timeless-artists-hub-server.onrender.com)

## GitHub Repositories

- [Frontend Repository](https://github.com/jorammercado/timeless-artists-hub)
- [Backend Repository](https://github.com/jorammercado/timeless-artists-hub-server)
- [SQL Data Helper (json-to-sql)](https://github.com/jorammercado/timeless-artists-hub-sql-seed)

## Data Preparation

The raw artwork data was sourced from the [WikiArt Kaggle Dataset](https://www.kaggle.com/datasets/antoinegruson/-wikiart-all-images-120k-link). The CSV file was converted to JSON and transformed into SQL insert statements using a custom Node.js script.

- Over 14,000 artworks from 50+ famous artists were selected for inclusion
- Artist metadata includes: name, biography, nationality, genre, YouTube video, and Wikipedia link
- Artwork metadata includes: title, artist, date created, style, and image URL

## Installation and Setup

1. **Clone the frontend and backend repositories:**

   ```bash
   git clone https://github.com/jorammercado/timeless-artists-hub.git
   git clone https://github.com/jorammercado/timeless-artists-hub-server.git
   ```

2. **Install frontend dependencies:**

   ```bash
   cd timeless-artists-hub-app
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../timeless-artists-hub-server
   npm install
   ```

4. **Initialize and seed the database:**

   ```bash
   npm run dbinit
   npm run dbseed
   ```

5. **Start development servers:**

   - Frontend: `npm run dev`
   - Backend: `npm start`

> Ensure you have a local PostgreSQL instance running and configured with the necessary tables.

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) for more information.

## Contact

For questions or feedback:

- Joram Mercado — [GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)

