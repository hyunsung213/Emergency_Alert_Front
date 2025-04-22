export interface IEarthquakeShelter {
  fclt_nm?: string; // 시설명
  mng_dept_nm?: string; // 관리부서
  se_nm?: string; // 구분명 (예: 지진실내구호소)
  ctpv_nm?: string; // 시도명
  lot: number; // 경도
  fcar?: string; // 시설면적
  se?: number; // 구분
  shlt_id?: number; // 피난처 ID
  daddr?: string; // 상세주소
  sgg_nm?: string; // 시군구명
  lat: number; // 위도
}
