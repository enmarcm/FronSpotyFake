export const BASE_URL = "http://localhost:7878"

export enum URL_REQUEST{
    LOGIN = `${BASE_URL}/auth/login`,
    GET_SONG = `${BASE_URL}/songs/getById`
}