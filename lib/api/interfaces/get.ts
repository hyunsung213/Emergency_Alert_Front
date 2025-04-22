import apiClient from "./apiClient";

import { IEarthquakeShelter } from "./earthquakeShelter";
import { ListResponse } from "./type";

export type Coordinate = {
  lat: Number;
  lon: Number;
};

export async function getEarthquakeShelter({ lat, lon }: Coordinate) {
  return await apiClient.get<ListResponse<IEarthquakeShelter>>(
    `/nearby/earthquake-shelters?lat=${lat}&lon=${lon}`,
    {}
  );
}
