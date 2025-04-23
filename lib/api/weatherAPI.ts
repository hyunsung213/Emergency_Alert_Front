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
  serviceKey?: string;
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
    serviceKey = "YVeE3x8nNRvb8e2uEblu0OZl41gEgvlVxowMBAoa84gVh71gRFsAdw91ij7scDwXqn1f2er5wuqbyT7i%2Bn7bNw%3D%3D",
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

  // Add query parameters
  const rawServiceKey = decodeURIComponent(serviceKey);

  url.searchParams.append("serviceKey", rawServiceKey);
  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("numOfRows", numOfRows.toString());
  url.searchParams.append("dataType", dataType);
  url.searchParams.append("base_date", base_date);
  url.searchParams.append("base_time", base_time);
  url.searchParams.append("nx", nx.toString());
  url.searchParams.append("ny", ny.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data: WeatherResponse = await response.json();

  return data.response.body.items.item;
}
