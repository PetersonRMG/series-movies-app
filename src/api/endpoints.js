import { mediaType } from "../components/mediaType/mediaType";

export function getPopularEndpoint(type) {
  switch (type) {
    case mediaType.TV:
      return "/tv/popular";
    case mediaType.MOVIE:
    default:
      return "/movie/popular";
  }
}

export function getGenresEndpoint(type) {
  return type === mediaType.TV
    ? "/genre/tv/list"
    : "/genre/movie/list";
}

export function getDetailsEndpoint(mediaType, id) {
  return `/${mediaType}/${id}`;
}

export function getCreditsEndpoint(mediaType, id) {
  return `/${mediaType}/${id}/credits`;
}

export function getVideosEndpoint(mediaType, id) {
  return `/${mediaType}/${id}/videos?language=pt-BR`;
}

export function getSearchEndpoint(mediaType, query, page = 1) {
  return `/search/${mediaType}?query=${query}&page=${page}&language=pt-BR`;
}
