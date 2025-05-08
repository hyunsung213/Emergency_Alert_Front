import apiClient from "./interfaces/apiClient";

export interface WeatherItem {
  baseDate: string; // YYYYMMDD
  baseTime: string; // HHMM
  category: string; // 예: TMP, UUU, VVV, VEC 등
  fcstDate: string; // YYYYMMDD
  fcstTime: string; // HHMM
  fcstValue: string; // 예: 15, -0.6, 3.4 등
  nx: number;
  ny: number;
}

export interface WeatherResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: WeatherItem[];
      };
    };
  };
}

interface WeatherParams {
  pageNo?: number;
  numOfRows?: number;
  dataType?: "XML" | "JSON";
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
}

export async function getWeatherData(params: WeatherParams) {
  const {
    pageNo = 1,
    numOfRows = 1000,
    dataType = "JSON",
    base_date,
    base_time,
    nx,
    ny,
  } = params;

  const url = new URL(
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
  );

  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("numOfRows", numOfRows.toString());
  url.searchParams.append("dataType", dataType);
  url.searchParams.append("base_date", base_date);
  url.searchParams.append("base_time", base_time);
  url.searchParams.append("nx", nx.toString());
  url.searchParams.append("ny", ny.toString());

  const data = await apiClient.get<WeatherItem[]>("/weather", {
    params: {
      ...params,
    },
  });

  return data;
}
