import { createContext } from "react";

const HighlightedMealContext = createContext({ highlightedMeal: {}, toggleHighlightedMeal: () => {} });

export default HighlightedMealContext;
