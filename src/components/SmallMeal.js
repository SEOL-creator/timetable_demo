import { Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../utils/formatDateTime";
import axiosInstance from "../utils/axiosInstance";
import Box from "./Box";
import styles from "./SmallMeal.module.css";
import classNames from "classnames/bind";
import HighlightedMealContext from "../contexts/highlightedMealContext";
import useDateUpdate from "../hooks/useDateUpdate";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);

function getNextMonday(date) {
    if (date.getDay() === 0) {
        return new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    } else {
        return new Date(date.getTime() + (8 - date.getDay()) * 24 * 60 * 60 * 1000);
    }
}

function getTargetDay() {
    const today = new Date();
    if (today.getDay() === 6 || today.getDay() === 0) {
        return getNextMonday(today);
    } else if (today.getHours() >= 18) {
        if (today.getDay() === 5) {
            return getNextMonday(today);
        }
        return new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);
    }
    return today;
}

export default function SmallMeal() {
    const [isLoading, setIsLoading] = useState(true);
    const [targetDay, setTargetDay] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);

    const { highlightedMeal, toggleHighlightedMeal } = useContext(HighlightedMealContext);

    const { dateUpdate } = useDateUpdate();

    const isMaxWidth320 = useMediaQuery({ maxWidth: 320 });

    useEffect(() => {
        setTargetDay(getTargetDay());
    }, [dateUpdate]);

    useEffect(() => {
        async function fetchMeal() {
            if (!targetDay) return;
            try {
                const response = [
                    {
                        date: "2023-10-17",
                        type: 2,
                        number_of_people: 1053,
                        calories: 924,
                        meal_item: [
                            {
                                name: "찰흑미밥",
                                allergy_codes: "",
                            },
                            {
                                name: "한우곰탕(소머리,양지)",
                                allergy_codes: "6 13 16",
                            },
                            {
                                name: "양파고추간장초절임",
                                allergy_codes: "5 6",
                            },
                            {
                                name: "매콤메추리알어묵볶음",
                                allergy_codes: "1 2 5 6 12 16 18",
                            },
                            {
                                name: "깍두기",
                                allergy_codes: "9 13",
                            },
                            {
                                name: "젤리블리",
                                allergy_codes: "2 11",
                            },
                            {
                                name: "모듬전",
                                allergy_codes: "1 2 5 6 9 10 15 16 18",
                            },
                        ],
                    },
                    {
                        date: "2023-10-17",
                        type: 3,
                        number_of_people: 730,
                        calories: 677,
                        meal_item: [
                            {
                                name: "추가밥(선택)",
                                allergy_codes: "",
                            },
                            {
                                name: "쌀국수",
                                allergy_codes: "5 9 16",
                            },
                            {
                                name: "단무지무침",
                                allergy_codes: "13",
                            },
                            {
                                name: "알감자버터구이",
                                allergy_codes: "5 13",
                            },
                            {
                                name: "배추겉절이",
                                allergy_codes: "9 13",
                            },
                            {
                                name: "쿨피스(파인)",
                                allergy_codes: "2 5",
                            },
                            {
                                name: "빼빼롱치즈핫도그",
                                allergy_codes: "1 2 5 6 10 12 13 16",
                            },
                        ],
                    },
                ];
                response.forEach((meal) => {
                    if (meal.type === 2) {
                        setLunch(meal);
                    } else {
                        setDinner(meal);
                    }
                });
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        }

        fetchMeal();
    }, [targetDay]);

    return (
        <Box half={isMaxWidth320 ? false : true} className={styles.meal}>
            <div className={styles.heading}>
                <Link to="/meal">밥</Link>
                <span>{formatDateTime(targetDay, "DD일 aaaa")}</span>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.mealContent}>
                {isLoading ? (
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
                ) : !lunch && !dinner ? (
                    <>
                        <div className={styles.noMeal}>오늘은 급식이 없네요</div>
                    </>
                ) : (
                    <>
                        {lunch && (
                            <div>
                                <h1 className={styles.mealType}>중식</h1>
                                <div>
                                    {lunch?.meal_item.map((menu) => (
                                        <div
                                            key={menu.name}
                                            className={cx("menu", { "menu--highlighted": highlightedMeal[menu.name] === true })}
                                            onClick={() => {
                                                toggleHighlightedMeal(menu.name);
                                            }}
                                        >
                                            {menu.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {lunch && dinner && <div className={styles.separator}></div>}
                        {dinner && (
                            <div>
                                <h1 className={styles.mealType}>석식</h1>
                                <div>
                                    {dinner?.meal_item.map((menu) => (
                                        <div
                                            key={menu.name}
                                            className={cx("menu", { "menu--highlighted": highlightedMeal[menu.name] === true })}
                                            onClick={(e) => {
                                                toggleHighlightedMeal(menu.name);
                                            }}
                                        >
                                            {menu.name}
                                        </div>
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
