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
  serviceKey?: string; // 서비스 키
  numOfRows?: number; // 페이지당 개수
  pageNo?: number; // 페이지 번호
  returnType?: "JSON" | "XML"; // 응답 타입
  crtDt?: string; // 조회 시작일자(YYYYMMDD)
  rgnNm?: string; // 지역명(시도명, 시군구명)
}

/**
 * 재난 문자 목록을 조회하는 함수
 *
 * @param params 재난 문자 API 요청 파라미터
 * @returns 재난 문자 목록
 */
export async function getDisasterAlerts(params: DisasterAlertParams) {
  const {
    serviceKey = "7VJ3395DDO11Q705",
    numOfRows = 10,
    pageNo = 1,
    returnType = "JSON",
    crtDt,
    rgnNm,
  } = params;

  const url = new URL("https://www.safetydata.go.kr/V2/api/DSSP-IF-00247");
  // Add query parameters
  url.searchParams.append("serviceKey", serviceKey);
  url.searchParams.append("numOfRows", numOfRows.toString());
  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("returnType", returnType);

  console.log(crtDt, rgnNm);

  // // Add optional parameters only if they are provided
  if (crtDt) url.searchParams.append("crtDt", crtDt);
  if (rgnNm) url.searchParams.append("rgnNm", rgnNm);

  console.log("Disaster Alert API URL:", url.toString());

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`Disaster Alert API error: ${response.status}`);
    }

    const data: DisasterAlertResponse = await response.json();

    // Check for API error in the response
    if (data.header.resultCode !== "00") {
      throw new Error(
        `API error: ${data.header.resultMsg} (${data.header.resultCode})`
      );
    }

    return data.body;
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
    numOfRows: 50, // 더 많은 결과를 가져오기 위해 기본값보다 큰 값 설정
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
    numOfRows: 50, // 더 많은 결과를 가져오기 위해 기본값보다 큰 값 설정
    crtDt: date,
  });
}
