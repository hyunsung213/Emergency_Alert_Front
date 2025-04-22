import apiClient from "./apiClient";

import {
  IColdWaveShelter,
  IDustShelter,
  IEarthquakeOutdoorShelter,
  IEarthquakeShelter,
  IHeatShelter,
} from "./shelter";
import { ListResponse } from "./type";

export type Coordinate = {
  lat: Number;
  lon: Number;
};

export async function getEarthquakeOutdoorShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IEarthquakeOutdoorShelter>>(
    `/nearby/earthquake-outdoor-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}

export async function getEarthquakeShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IEarthquakeShelter>>(
    `/nearby/earthquake-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}

export async function getHeatShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IHeatShelter>>(
    `/nearby/heatwave-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}

export async function getDustShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IDustShelter>>(
    `/nearby/dust-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}

export async function getColdWaveShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IColdWaveShelter>>(
    `/nearby/coldwave-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}
