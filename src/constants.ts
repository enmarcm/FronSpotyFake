// export const BASE_URL = "http://localhost:7878"
export const BASE_URL = "https://spotyfakebackend-production.up.railway.app"

export enum URL_REQUEST{
    LOGIN = `${BASE_URL}/auth/login`,
    GET_SONG = `${BASE_URL}/songs/getById`,
    TOP_SONGS = `${BASE_URL}/songs/top`,
}