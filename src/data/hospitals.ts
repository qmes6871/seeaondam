export interface Hospital {
  id: number
  name: string
  address: string
  lat: number
  lng: number
}

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: '안산 에이스병원',
    address: '경기도 안산시 단원구 광덕대로 260',
    lat: 37.3189,
    lng: 126.8308,
  },
  {
    id: 2,
    name: '미아 서울척병원',
    address: '서울 강북구 도봉로 309',
    lat: 37.6138,
    lng: 127.0285,
  },
  {
    id: 3,
    name: '의정부 서울척병원',
    address: '경기도 의정부시 평화로 622',
    lat: 37.7475,
    lng: 127.0479,
  },
  {
    id: 4,
    name: '용인 서울예스병원',
    address: '경기도 용인시 기흥구 중부대로 579',
    lat: 37.2636,
    lng: 127.0900,
  },
  {
    id: 5,
    name: '강남 베드로병원',
    address: '서울 강남구 논현로 526',
    lat: 37.5121,
    lng: 127.0361,
  },
  {
    id: 6,
    name: '청담 나누리병원',
    address: '서울 강남구 압구정로 435',
    lat: 37.5241,
    lng: 127.0440,
  },
  {
    id: 7,
    name: '동탄 시티병원',
    address: '경기도 화성시 동탄대로 654',
    lat: 37.2052,
    lng: 127.0731,
  },
]

// 유원플러스 송파 (센터 위치)
export const centerLocation = {
  lat: 37.4783,
  lng: 127.1443,
  zoomPC: 11,
  zoomMobile: 10,
}

// 기본 선택 병원: 강남 베드로병원
export const defaultSelectedHospitalId = 5
