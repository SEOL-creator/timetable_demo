import { Skeleton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "./Box";
import styles from "./Meal.module.css";

const meal = {
    mealServiceDietInfo: [
        { head: [{ list_total_count: 29 }, { RESULT: { CODE: "INFO-000", MESSAGE: "정상 처리되었습니다." } }] },
        {
            row: [
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211101",
                    MLSV_FGR: "1063",
                    DDISH_NM: "찰흑미밥*<br/>한우쇠고기미역국*2.5.6.13.<br/>매운갈비구이*5.6.10.12.13.<br/>시저샐러드1.2.5.6.10.13.<br/>잡채*1.5.6.8.13.<br/>에그타르트1.2.5.6.13.<br/>배추김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "938.2 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 114.4<br/>단백질(g) : 43.4<br/>지방(g) : 34.9<br/>비타민A(R.E) : 324.9<br/>티아민(mg) : 1.0<br/>리보플라빈(mg) : 0.9<br/>비타민C(mg) : 19.3<br/>칼슘(mg) : 151.9<br/>철분(mg) : 5.2",
                    MLSV_FROM_YMD: "20211101",
                    MLSV_TO_YMD: "20211101",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211102",
                    MLSV_FGR: "1063",
                    DDISH_NM: "칼슘기장밥*<br/>콩비지찌개*(김치)5.9.10.13.<br/>청포묵무침*1.5.6.13.<br/>장각구이*5.13.15.<br/>총각김치9.13.<br/>인도커리+난1.2.5.6.12.13.16.18.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "775.5 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 87.9<br/>단백질(g) : 44.7<br/>지방(g) : 29.6<br/>비타민A(R.E) : 243.1<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 7.7<br/>칼슘(mg) : 199.5<br/>철분(mg) : 5.2",
                    MLSV_FROM_YMD: "20211102",
                    MLSV_TO_YMD: "20211102",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211103",
                    MLSV_FGR: "1063",
                    DDISH_NM:
                        "칼슘기장밥*<br/>한우갈비탕*1.2.5.6.13.16.<br/>오징어오이무침*5.6.13.17.<br/>깻잎전10.1.5.6.<br/>새우전1.5.6.9.10.<br/>깍두기9.13.<br/>사과주스(한입사과)13.<br/>수능후식(초코)2.5.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "923.6 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 109.8<br/>단백질(g) : 38.1<br/>지방(g) : 36.5<br/>비타민A(R.E) : 50.6<br/>티아민(mg) : 0.3<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 11.7<br/>칼슘(mg) : 241.3<br/>철분(mg) : 6.2",
                    MLSV_FROM_YMD: "20211103",
                    MLSV_TO_YMD: "20211103",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211104",
                    MLSV_FGR: "699",
                    DDISH_NM: "혼합잡곡밥5.<br/>닭개장*1.5.6.13.15.<br/>뮤즐리멸치볶음4.5.6.13.<br/>도라지유자강정5.6.13.<br/>고구마치즈롤까스1.2.5.6.10.11.12.13.15.16.<br/>깍두기9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "787.9 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 102.7<br/>단백질(g) : 37.4<br/>지방(g) : 25.4<br/>비타민A(R.E) : 120.7<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 17.2<br/>칼슘(mg) : 249.0<br/>철분(mg) : 2.9",
                    MLSV_FROM_YMD: "20211104",
                    MLSV_TO_YMD: "20211104",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211105",
                    MLSV_FGR: "699",
                    DDISH_NM:
                        "추가밥(선택)<br/>짜계치1.2.5.6.10.13.<br/>양상추샐러드*<br/>탕수육2*1.5.6.10.11.12.13.<br/>반달단무지*<br/>배추김치9.13.<br/>블루베리드레싱1.2.5.6.<br/>크로플+아이스크림1.2.5.6.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "999.7 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 138.4<br/>단백질(g) : 34.8<br/>지방(g) : 28.4<br/>비타민A(R.E) : 295.7<br/>티아민(mg) : 0.4<br/>리보플라빈(mg) : 1.7<br/>비타민C(mg) : 19.1<br/>칼슘(mg) : 286.0<br/>철분(mg) : 11.0",
                    MLSV_FROM_YMD: "20211105",
                    MLSV_TO_YMD: "20211105",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211108",
                    MLSV_FGR: "702",
                    DDISH_NM:
                        "김가루밥13.<br/>김치짜글이*2.5.6.9.10.13.<br/>진미채고추장볶음*5.6.13.<br/>계란말이*1.2.5.6.10.<br/>고추잡채크로켓1.2.5.6.10.12.13.16.<br/>총각김치9.13.<br/>요구르트652.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "830.5 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 87.8<br/>단백질(g) : 55.1<br/>지방(g) : 22.0<br/>비타민A(R.E) : 414.0<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 1.1<br/>비타민C(mg) : 14.0<br/>칼슘(mg) : 505.2<br/>철분(mg) : 6.0",
                    MLSV_FROM_YMD: "20211108",
                    MLSV_TO_YMD: "20211108",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211109",
                    MLSV_FGR: "702",
                    DDISH_NM: "칼슘기장밥*<br/>종합어묵국*1.5.6.13.<br/>무들깨볶음*5.6.<br/>찰도그*(80)1.2.5.6.10.13.15.18.<br/>숯불맛닭구이+또띠아1.2.5.6.10.12.13.15.16.<br/>배추김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "1035.0 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 147.0<br/>단백질(g) : 60.2<br/>지방(g) : 24.4<br/>비타민A(R.E) : 135.0<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 14.2<br/>칼슘(mg) : 533.4<br/>철분(mg) : 4.6",
                    MLSV_FROM_YMD: "20211109",
                    MLSV_TO_YMD: "20211109",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211110",
                    MLSV_FGR: "702",
                    DDISH_NM: "찰흑미밥*<br/>설렁탕*2.5.6.13.16.<br/>두부조림*5.6.<br/>유채나물무침(생)5.6.<br/>장어튀김+생강초절임2.5.6.12.13.<br/>깍두기9.13.<br/>요거트푸딩1.2.5.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "1287.5 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 149.9<br/>단백질(g) : 46.9<br/>지방(g) : 53.2<br/>비타민A(R.E) : 157.5<br/>티아민(mg) : 0.3<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 19.2<br/>칼슘(mg) : 2989.9<br/>철분(mg) : 168.7",
                    MLSV_FROM_YMD: "20211110",
                    MLSV_TO_YMD: "20211110",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211122",
                    MLSV_FGR: "699",
                    DDISH_NM: "찰흑미밥*<br/>우거지멸치된장국*5.6.9.13.<br/>매운갈비강정5.6.10.12.13.<br/>시금치무침*<br/>리코타치즈샐러드1.2.5.6.<br/>총각김치9.13.<br/>단감(완)",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "926.8 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 115.8<br/>단백질(g) : 47.6<br/>지방(g) : 31.1<br/>비타민A(R.E) : 537.9<br/>티아민(mg) : 1.4<br/>리보플라빈(mg) : 0.8<br/>비타민C(mg) : 44.6<br/>칼슘(mg) : 221.3<br/>철분(mg) : 5.5",
                    MLSV_FROM_YMD: "20211122",
                    MLSV_TO_YMD: "20211122",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211123",
                    MLSV_FGR: "700",
                    DDISH_NM: "혼합잡곡밥5.<br/>어묵김치국1.5.6.9.13.<br/>안동찜닭*5.6.8.13.<br/>숙주나물무침*<br/>메밀전병2.3.5.6.<br/>깍두기9.13.<br/>키위(R)",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "802.5 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 113.6<br/>단백질(g) : 44.8<br/>지방(g) : 20.0<br/>비타민A(R.E) : 255.6<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 0.9<br/>비타민C(mg) : 91.4<br/>칼슘(mg) : 199.2<br/>철분(mg) : 6.0",
                    MLSV_FROM_YMD: "20211123",
                    MLSV_TO_YMD: "20211123",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211124",
                    MLSV_FGR: "700",
                    DDISH_NM: "칼슘기장밥*<br/>북어계란국*1.5.6.13.<br/>바지락찜<br/>꽃당토마토샐러드1.2.5.6.12.13.<br/>돈육두루치기5.6.10.13.<br/>배추김치9.13.<br/>피치코코2.5.11.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "816.9 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 115.6<br/>단백질(g) : 50.1<br/>지방(g) : 17.3<br/>비타민A(R.E) : 340.7<br/>티아민(mg) : 0.8<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 19.5<br/>칼슘(mg) : 210.0<br/>철분(mg) : 6.6",
                    MLSV_FROM_YMD: "20211124",
                    MLSV_TO_YMD: "20211124",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211125",
                    MLSV_FGR: "700",
                    DDISH_NM: "현미찹쌀밥*<br/>동태탕*5.6.9.13.<br/>문어꽈리고추볶음*5.6.13.<br/>토마토미트볼그라탕1.2.5.6.10.12.13.15.16.18.<br/>두부까스+마파소스1.5.6.10.12.13.<br/>배추김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "1016.0 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 130.4<br/>단백질(g) : 59.7<br/>지방(g) : 30.7<br/>비타민A(R.E) : 299.9<br/>티아민(mg) : 0.8<br/>리보플라빈(mg) : 1.2<br/>비타민C(mg) : 39.8<br/>칼슘(mg) : 466.8<br/>철분(mg) : 6.8",
                    MLSV_FROM_YMD: "20211125",
                    MLSV_TO_YMD: "20211125",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211126",
                    MLSV_FGR: "700",
                    DDISH_NM: "로제스파게티*1.2.5.6.9.10.12.13.16.18.<br/>총각김치볶음*5.6.9.13.<br/>셀프치킨또띠아1.2.5.6.10.12.13.15.18.<br/>크로핀1.2.5.6.<br/>오이피클(완/굵)<br/>숭늉",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "949.8 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 143.0<br/>단백질(g) : 33.8<br/>지방(g) : 30.3<br/>비타민A(R.E) : 191.2<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 42.8<br/>칼슘(mg) : 211.4<br/>철분(mg) : 5.2",
                    MLSV_FROM_YMD: "20211126",
                    MLSV_TO_YMD: "20211126",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211129",
                    MLSV_FGR: "700",
                    DDISH_NM: "찰흑미밥*<br/>가리비조개탕*18.<br/>돈수육*(저수분)5.6.10.13.<br/>아삭고추쌈장무침*5.6.<br/>야채쫄면무침*5.6.12.13.<br/>보쌈김치9.13.<br/>단감(완)",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "847.8 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 113.2<br/>단백질(g) : 60.4<br/>지방(g) : 17.9<br/>비타민A(R.E) : 184.0<br/>티아민(mg) : 1.2<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 41.8<br/>칼슘(mg) : 222.0<br/>철분(mg) : 10.6",
                    MLSV_FROM_YMD: "20211129",
                    MLSV_TO_YMD: "20211129",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "2",
                    MMEAL_SC_NM: "중식",
                    MLSV_YMD: "20211130",
                    MLSV_FGR: "700",
                    DDISH_NM: "칼슘기장밥*<br/>들깨감자옹심이국5.6.13.17.18.<br/>양배추옥수수샐러드1.5.13.<br/>오징어실채볶음5.6.13.17.<br/>속초식닭강정1.2.5.6.9.12.13.15.<br/>배추김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "1059.8 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 144.0<br/>단백질(g) : 45.3<br/>지방(g) : 36.2<br/>비타민A(R.E) : 79.5<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 10.6<br/>칼슘(mg) : 255.4<br/>철분(mg) : 4.9",
                    MLSV_FROM_YMD: "20211130",
                    MLSV_TO_YMD: "20211130",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211101",
                    MLSV_FGR: "640",
                    DDISH_NM: "미니김가루밥13.<br/>냉메밀소바*3.5.6.13.<br/>양배추샐러드(흑임자)1.5.<br/>모듬카츠1.2.5.6.10.15.18.<br/>배추겉절이9.13.<br/>자두음료",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "928.7 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 143.7<br/>단백질(g) : 29.2<br/>지방(g) : 29.2<br/>비타민A(R.E) : 142.6<br/>티아민(mg) : 0.4<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 17.0<br/>칼슘(mg) : 106.1<br/>철분(mg) : 3.9",
                    MLSV_FROM_YMD: "20211101",
                    MLSV_TO_YMD: "20211101",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211102",
                    MLSV_FGR: "640",
                    DDISH_NM:
                        "칼슘기장밥*<br/>북어무국*13.<br/>브로컬리꽃맛살땅콩샐러드1.4.5.6.8.13.18.<br/>고기떡말이*1.2.5.6.10.12.13.<br/>매콤볼어묵볶음1.5.6.13.<br/>배추김치9.13.<br/>명란마요바게트(1)1.2.5.6.13.16.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "996.0 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 99.6<br/>단백질(g) : 47.8<br/>지방(g) : 46.1<br/>비타민A(R.E) : 144.1<br/>티아민(mg) : 0.9<br/>리보플라빈(mg) : 0.8<br/>비타민C(mg) : 20.7<br/>칼슘(mg) : 288.2<br/>철분(mg) : 5.0",
                    MLSV_FROM_YMD: "20211102",
                    MLSV_TO_YMD: "20211102",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211103",
                    MLSV_FGR: "640",
                    DDISH_NM: "전복죽18.<br/>치킨버거1.2.5.6.12.13.15.<br/>무말랭이무침(완)*13.5.6.<br/>감자튀김(스마일)5.6.12.<br/>배추겉절이9.13.<br/>쥬시쿨2.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "563.7 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 84.1<br/>단백질(g) : 20.5<br/>지방(g) : 16.8<br/>비타민A(R.E) : 51.9<br/>티아민(mg) : 0.8<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 4.9<br/>칼슘(mg) : 71.9<br/>철분(mg) : 7.5",
                    MLSV_FROM_YMD: "20211103",
                    MLSV_TO_YMD: "20211103",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211104",
                    MLSV_FGR: "424",
                    DDISH_NM: "미니김가루밥13.<br/>새우튀김우동*1.5.6.9.13.16.18.<br/>시카고피자1/41.2.5.6.10.12.13.15.16.<br/>반달단무지*<br/>배추겉절이9.13.<br/>청포도플리또5.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "857.7 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 143.7<br/>단백질(g) : 25.9<br/>지방(g) : 21.0<br/>비타민A(R.E) : 175.9<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 10.5<br/>칼슘(mg) : 285.6<br/>철분(mg) : 5.5",
                    MLSV_FROM_YMD: "20211104",
                    MLSV_TO_YMD: "20211104",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211105",
                    MLSV_FGR: "424",
                    DDISH_NM: "현미찹쌀밥*<br/>얼갈이배추된장국*5.6.9.13.<br/>등갈비구이*5.6.10.12.13.<br/>구운버섯샐러드 1.2.5.6.<br/>고구마<br/>총각김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "868.0 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 100.8<br/>단백질(g) : 44.2<br/>지방(g) : 34.7<br/>비타민A(R.E) : 131.7<br/>티아민(mg) : 1.0<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 20.5<br/>칼슘(mg) : 227.2<br/>철분(mg) : 4.4",
                    MLSV_FROM_YMD: "20211105",
                    MLSV_TO_YMD: "20211105",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211108",
                    MLSV_FGR: "400",
                    DDISH_NM: "추가밥(선택)<br/>멸치국수+양념장*꼬치어묵1.5.6.9.13.<br/>새우만두(55)1.5.6.8.9.10.12.15.16.17.18.<br/>김말이강정1.5.6.10.12.13.16.18.<br/>배추김치9.13.<br/>바나나",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "826.6 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 133.6<br/>단백질(g) : 27.5<br/>지방(g) : 19.7<br/>비타민A(R.E) : 83.1<br/>티아민(mg) : 0.2<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 9.6<br/>칼슘(mg) : 129.5<br/>철분(mg) : 10.4",
                    MLSV_FROM_YMD: "20211108",
                    MLSV_TO_YMD: "20211108",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211109",
                    MLSV_FGR: "400",
                    DDISH_NM:
                        "칼슘기장밥*<br/>들깨수제비5.6.9.13.18.<br/>마카로니샐러드1.2.5.6.10.13.<br/>명엽채볶음*5.6.13.<br/>등심돈까스**1.2.5.6.10.11.12.13.15.16.<br/>깍두기9.13.<br/>요구르트652.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "928.9 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 137.5<br/>단백질(g) : 42.3<br/>지방(g) : 22.5<br/>비타민A(R.E) : 26.1<br/>티아민(mg) : 0.4<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 6.9<br/>칼슘(mg) : 519.4<br/>철분(mg) : 6.0",
                    MLSV_FROM_YMD: "20211109",
                    MLSV_TO_YMD: "20211109",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211110",
                    MLSV_FGR: "400",
                    DDISH_NM: "추가밥(선택)<br/>탄탄멘1.2.4.5.6.9.10.12.13.16.17.18.<br/>양배추샐러드1.5.13.<br/>허니치킨1.5.6.15.<br/>배추김치9.13.<br/>블루베리무피클",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "870.1 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 121.8<br/>단백질(g) : 45.6<br/>지방(g) : 21.3<br/>비타민A(R.E) : 139.4<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 20.9<br/>칼슘(mg) : 101.7<br/>철분(mg) : 3.2",
                    MLSV_FROM_YMD: "20211110",
                    MLSV_TO_YMD: "20211110",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211122",
                    MLSV_FGR: "410",
                    DDISH_NM: "강황밥&카레**2.5.6.10.12.13.16.<br/>열대과일샐러드*12.13.<br/>고추장열무무침*5.6.13.<br/>달콤소보로후라이드1.2.5.12.15.<br/>배추김치9.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "732.7 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 99.5<br/>단백질(g) : 39.6<br/>지방(g) : 20.6<br/>비타민A(R.E) : 584.0<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 0.8<br/>비타민C(mg) : 18.0<br/>칼슘(mg) : 115.1<br/>철분(mg) : 4.0",
                    MLSV_FROM_YMD: "20211122",
                    MLSV_TO_YMD: "20211122",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211123",
                    MLSV_FGR: "410",
                    DDISH_NM:
                        "혼합잡곡밥5.<br/>뜨덕이만두국*1.5.6.9.10.13.15.16.18.<br/>매콤떡갈비*구운야채+투움바소스1.2.5.6.9.10.12.13.15.16.18.<br/>배추김치9.13.<br/>오이깍둑무침13.<br/>망고푸딩1.5.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "674.1 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 100.3<br/>단백질(g) : 29.4<br/>지방(g) : 19.6<br/>비타민A(R.E) : 262.2<br/>티아민(mg) : 0.8<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 15.8<br/>칼슘(mg) : 176.6<br/>철분(mg) : 6.8",
                    MLSV_FROM_YMD: "20211123",
                    MLSV_TO_YMD: "20211123",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211125",
                    MLSV_FGR: "410",
                    DDISH_NM:
                        "현미찹쌀밥*<br/>계란후라이1.5.<br/>새우1.2.4.5.6.9.12.13.<br/>오징어튀김(감자맛)1.5.6.17.<br/>반달단무지*<br/>배추김치9.13.<br/>사천자장소스**2.5.6.10.13.16.<br/>스위티자몽5.13.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "824.8 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 102.9<br/>단백질(g) : 28.6<br/>지방(g) : 31.1<br/>비타민A(R.E) : 132.1<br/>티아민(mg) : 0.4<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 49.6<br/>칼슘(mg) : 193.1<br/>철분(mg) : 4.5",
                    MLSV_FROM_YMD: "20211125",
                    MLSV_TO_YMD: "20211125",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211126",
                    MLSV_FGR: "410",
                    DDISH_NM: "현미찹쌀밥*<br/>몽글순두부+양념장*5.6.<br/>치커리들기름무침5.6.18.<br/>돈육목살스테이크6.10.12.13.<br/>배추겉절이9.13.<br/>도토리묵+양념장*5.6.",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "871.6 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 95.9<br/>단백질(g) : 46.5<br/>지방(g) : 35.7<br/>비타민A(R.E) : 152.2<br/>티아민(mg) : 1.3<br/>리보플라빈(mg) : 1.0<br/>비타민C(mg) : 11.5<br/>칼슘(mg) : 321.1<br/>철분(mg) : 6.7",
                    MLSV_FROM_YMD: "20211126",
                    MLSV_TO_YMD: "20211126",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211129",
                    MLSV_FGR: "435",
                    DDISH_NM: "찰흑미밥*<br/>수육국밥+다대기1.2.5.6.10.13.<br/>순대*6.10.<br/>영양부추무침*13.<br/>해물완자전(CJ)1.2.5.6.8.9.10.12.13.15.16.17.18.<br/>깍두기9.13.<br/>멜론(완)*",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "890.5 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 123.5<br/>단백질(g) : 41.2<br/>지방(g) : 23.8<br/>비타민A(R.E) : 129.1<br/>티아민(mg) : 0.9<br/>리보플라빈(mg) : 1.4<br/>비타민C(mg) : 5.8<br/>칼슘(mg) : 134.0<br/>철분(mg) : 10.5",
                    MLSV_FROM_YMD: "20211129",
                    MLSV_TO_YMD: "20211129",
                },
                {
                    ATPT_OFCDC_SC_CODE: "J10",
                    ATPT_OFCDC_SC_NM: "경기도교육청",
                    SD_SCHUL_CODE: "7530058",
                    SCHUL_NM: "김포고등학교",
                    MMEAL_SC_CODE: "3",
                    MMEAL_SC_NM: "석식",
                    MLSV_YMD: "20211130",
                    MLSV_FGR: "435",
                    DDISH_NM: "추가밥(선택)<br/>잔치국수(대)1.5.6.9.13.<br/>고기왕만두(산둥)1.5.6.10.16.18.<br/>크로크무슈1.2.5.6.<br/>배추겉절이9.13.<br/>파인애플(완)*",
                    ORPLC_INFO:
                        "쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>콩 : 국내산",
                    CAL_INFO: "858.6 Kcal",
                    NTR_INFO:
                        "탄수화물(g) : 133.6<br/>단백질(g) : 25.1<br/>지방(g) : 26.2<br/>비타민A(R.E) : 252.4<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 0.7<br/>비타민C(mg) : 38.2<br/>칼슘(mg) : 189.3<br/>철분(mg) : 3.6",
                    MLSV_FROM_YMD: "20211130",
                    MLSV_TO_YMD: "20211130",
                },
            ],
        },
    ],
};

export default function Meal() {
    const [loading, setLoading] = useState(true);

    const TODAY = new Date(new Date().getTime() - 7 * 2 * 24 * 60 * 60 * 1000);
    // const TODAY = new Date();
    console.log(TODAY);
    console.log(`${TODAY.getFullYear()}${TODAY.getMonth() + 1}${TODAY.getDate()}`);
    console.log(TODAY.getDate());
    console.log(TODAY.getMonth() + 1);
    const lunchToday = meal.mealServiceDietInfo[1].row
        .find((element) => {
            return element?.MLSV_YMD === `${TODAY.getFullYear()}${TODAY.getMonth() + 1}0${TODAY.getDate()}` && element?.MMEAL_SC_NM === "중식";
        })
        ?.DDISH_NM.replace(/\*/g, "")
        .replace(/\./g, "")
        .replace(/[0-9]+/g, "")
        .split("<br/>");
    const dinnerToday = meal.mealServiceDietInfo[1].row
        .find((element) => {
            return element?.MLSV_YMD === `${TODAY.getFullYear()}${TODAY.getMonth() + 1}0${TODAY.getDate()}` && element?.MMEAL_SC_NM === "석식";
        })
        ?.DDISH_NM.replace(/\*/g, "")
        .replace(/\./g, "")
        .replace(/[0-9]+/g, "")
        .split("<br/>");

    console.log(
        meal.mealServiceDietInfo[1].row.find((element) => {
            return element?.MLSV_YMD === `${TODAY.getFullYear()}${TODAY.getMonth() + 1}0${TODAY.getDate()}` && element?.MMEAL_SC_NM === "중식";
        })
    );

    return (
        <Box className={styles.meal}>
            <div className={styles.heading}>
                <Link to="/meal">밥</Link>
            </div>
            <div className={styles.mealContent}>
                {loading ? (
                    <>
                        <div>
                            <h1 className={styles.mealType}>중식</h1>
                            <div>
                                <Skeleton animation="wave" width={60} height={19} />
                                <Skeleton animation="wave" width={80} height={19} />
                                <Skeleton animation="wave" width={60} height={19} />
                                <Skeleton animation="wave" width={100} height={19} />
                                <Skeleton animation="wave" width={80} height={19} />
                                <Skeleton animation="wave" width={100} height={19} />
                            </div>
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            <h1 className={styles.mealType}>석식</h1>
                            <div>
                                <Skeleton animation="wave" width={60} height={19} />
                                <Skeleton animation="wave" width={80} height={19} />
                                <Skeleton animation="wave" width={60} height={19} />
                                <Skeleton animation="wave" width={100} height={19} />
                                <Skeleton animation="wave" width={80} height={19} />
                                <Skeleton animation="wave" width={100} height={19} />
                            </div>
                        </div>
                    </>
                ) : !lunchToday && !dinnerToday ? (
                    <>
                        <div className={styles.noMeal}>오늘은 급식이 없어요 ㅠㅠ</div>
                        <Link to="/meal">
                            {">"} 다른 날 급식 보러가기 {"<"}
                        </Link>
                    </>
                ) : (
                    <>
                        {lunchToday && (
                            <div>
                                <h1 className={styles.mealType}>중식</h1>
                                <div>
                                    {lunchToday?.map((value) => (
                                        <div className={styles.menu}>{value}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {lunchToday && dinnerToday && <div className={styles.separator}></div>}
                        {dinnerToday && (
                            <div>
                                <h1 className={styles.mealType}>석식</h1>
                                <div>
                                    {dinnerToday?.map((value) => (
                                        <div className={styles.menu}>{value}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Box>
    );
}
