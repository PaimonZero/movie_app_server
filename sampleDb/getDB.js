const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: "en-US",
                page: 5, // Thay đổi số trang nếu cần
            },
        });

        const movies = response.data.results.map((movie) => ({
            title: movie.title,
            releaseDate: movie.release_date,
            posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            rating: movie.vote_average,
            voteCount: movie.vote_count,
        }));

        fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
        console.log("Dữ liệu phim đã được lưu vào movies.json");
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ TMDB:", error.message);
    }
}

fetchMovies();
