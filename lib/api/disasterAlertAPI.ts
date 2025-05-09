import apiClient from "./interfaces/apiClient";

// Disaster Alert API Response Interface
export interface DisasterAlertItem {
  SN: string; // 일련번호
  CRT_DT: string; // 생성일시
  MSG_CN: string; // 메시지내용
  RCPTN_RGN_NM: string; // 수신지역명
  EMRG_STEP_NM: string; // 긴급단계명
  DST_SE_NM: string; // 재해구분명
  REG_YMD: string; // 등록일자
  MDFCN_YMD: string; // 수정일자
}

export interface DisasterAlertResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    errorMsg: string | null;
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  body: DisasterAlertItem[];
}

// Request Parameters Interface
interface DisasterAlertParams {
  numOfRows?: number; // 페이지당 개수
  pageNo?: number; // 페이지 번호
  returnType?: "JSON" | "XML"; // 응답 타입
  crtDt?: string; // 조회 시작일자(YYYYMMDD)
  rgnNm?: string; // 지역명(시도명, 시군구명)
}

export async function getDisasterAlerts(params: DisasterAlertParams) {
  const {
    numOfRows = 10,
    pageNo = 1,
    returnType = "JSON",
    crtDt,
    rgnNm,
  } = params;

  // Build query parameters object
  const queryParams: Record<string, string> = {
    numOfRows: numOfRows.toString(),
    pageNo: pageNo.toString(),
    returnType: returnType,
  };

  // Add optional parameters only if they are provided
  if (crtDt) queryParams.crtDt = crtDt;
  // if (rgnNm && rgnNm !== "전국") queryParams.rgnNm = rgnNm;
  queryParams.rgnNm = "전국";

  try {
    // Use the external API URL directly with apiClient
    const data = await apiClient.get<DisasterAlertItem[]>("/disaster-alerts", {
      params: queryParams,
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch disaster alerts:", error);
    throw error;
  }
}

/**
 * 재난 문자를 날짜를 기준으로 조회하는 함수
 *
 * @param date 조회할 날짜 (YYYYMMDD 형식)
 * @returns 해당 날짜의 재난 문자 목록
 */
export async function getDisasterAlertsByDate(date: string) {
  return getDisasterAlerts({
    crtDt: date,
    numOfRows: 10, // 더 많은 결과를 가져오기 위해 기본값보다 큰 값 설정
  });
}

/**
 * 재난 문자를 지역 이름으로 조회하는 함수
 *
 * @param regionName 지역명 (시도명 또는 시군구명)
 * @returns 해당 지역의 재난 문자 목록
 */
export async function getDisasterAlertsByRegion(
  regionName: string,
  date?: string
) {
  return getDisasterAlerts({
    rgnNm: regionName,
    numOfRows: 10, // 더 많은 결과를 가져오기 위해 기본값보다 큰 값 설정
    crtDt: date,
  });
}
