export interface IEarthquakeOutdoorShelter {
  fclt_no?: string; // 시설번호
  fclt_sn?: string; // 시설일련번호
  stdg_cd?: string; // 법정동코드
  road_nm_addr_cd?: string; // 도로명주소코드
  dong_cd?: string; // 행정동코드
  rgn_cd?: string; // 지역코드
  daddr?: string; // 상세주소
  xcrd?: string; // X좌표
  ctpv_nm?: string; // 시도명
  lat?: number; // 위도
  fcar?: string; // 시설면적
  sgg_nm?: string; // 시군구명
  actc_fclt_nm?: string; // 수용시설명
  ycrd?: string; // Y좌표
  lot?: number; // 경도
}

export interface IEarthquakeShelter {
  fclt_nm?: string; // 시설명
  mng_dept_nm?: string; // 관리부서
  se_nm?: string; // 구분명 (예: 지진실내구호소)
  ctpv_nm?: string; // 시도명
  lot?: number; // 경도
  fcar?: string; // 시설면적
  se?: number; // 구분
  shlt_id?: number; // 피난처 ID
  daddr?: string; // 상세주소
  sgg_nm?: string; // 시군구명
  lat?: number; // 위도
}

export interface IHeatShelter {
  fclt_type?: string; // 시설유형
  ycrd?: number; // Y좌표
  road_nm_addr?: string; // 도로명주소
  rgn_cd?: string; // 지역코드
  utztn_psblty_nope?: number; // 수용인원
  oper_end_ymd?: string; // 운영종료일
  area?: string; // 지역
  lotno_daddr?: string; // 지번주소
  yr?: string; // 연도
  xcrd?: number; // X좌표
  lot?: number; // 경도
  restarea_nm?: string; // 시설명
  rmrk?: string; // 비고
  oper_bgng_ymd?: string; // 운영시작일
  lat?: number; // 위도
}

export interface IDustShelter {
  fclt_nm?: string; // 시설명
  area?: string; // 지역
  sno?: number; // 시설번호
  fclt_type?: string; // 시설유형
  dong_nm?: string; // 동명
  wd_utztn_hrm?: string; // 평일 운영 시간
  ycrd?: number; // Y좌표
  mbsh_yn?: string; // 시설 운영 여부
  xcrd?: number; // X좌표
  we_utztn_hrm?: string; // 주말 운영 시간
  addr?: string; // 주소
  rmrk?: string; // 비고
  utztn_psblty_nope?: string; // 수용 가능 인원
  lat?: number; // 위도
  lot?: number; // 경도
}

export interface IColdWaveShelter {
  sno?: number; // 시설번호
  restarea_nm?: string; // 시설명
  road_nm_addr?: string; // 도로명주소
  lotno_addr?: string; // 지번주소
  fclt_type?: string; // 시설유형
  utztn_psblty_nope?: number; // 수용인원
  oper_bgng_ymd?: Date; // 운영시작일
  oper_end_ymd?: Date; // 운영종료일
  xcrd?: number; // X좌표
  ycrd?: number; // Y좌표
  lat?: number; // 위도
  lot?: number; // 경도
  wd_opn_yn?: string; // 평일 운영 여부
  wd_opn_hrm?: string; // 평일 운영 시작 시간
  wd_end_hrm?: string; // 평일 운영 종료 시간
  sun_opn_yn?: string; // 일요일 운영 여부
  sun_opn_hrm?: string; // 일요일 운영 시작 시간
  sun_end_hrm?: string; // 일요일 운영 종료 시간
  sat_opn_yn?: string; // 토요일 운영 여부
  sat_opn_hrm?: string; // 토요일 운영 시작 시간
  sat_end_hrm?: string; // 토요일 운영 종료 시간
  lhldy_opn_yn?: string; // 공휴일 운영 여부
  lhldy_opn_hrm?: string; // 공휴일 운영 시작 시간
  lhldy_end_hrm?: string; // 공휴일 운영 종료 시간
  nght_opn?: string; // 야간 운영 여부
  rmrk?: string; // 비고
  use_yn?: string; // 사용 여부
}

export interface IFloodShelter {
  r_seq_no: number; // 시설번호
  cd_area: number; // 지역코드
  no_equp_se: number; // 시설구분코드
  sd_nm: string; // 시도명
  sgg_nm: string; // 시군구명
  cd_equp: number;
  gb_acmd: string;
  equp_nm: string;
  rdnmadr_cd: string;
  bdong_cd: string;
  hdong_cd: string;
  loc_sfpr_a: string;
  sect_equp: number;
  qty_cpty: number;
  xcord: number;
  ycord: number;
  xx: number;
  yy: number;
  lat: number; // 위도
  lot: number; // 경도
  cd_gubun: string;
}
