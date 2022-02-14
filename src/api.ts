const API_KEY = "aae585e228cdd92c5039601206f8a690";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id:number;
    backdrop_path:string;
    poster_path:string;
    title:string;
    overview:string;
}

export interface IGetMovieResult {
    dates: { 
        aximum: string; 
        minimum: string; 
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
export const getMovies = () => {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}