import { DefaultTheme } from "styled-components";
import ICategory from "../interfaces/ICategory";

const getBackgroundColor = (theme : DefaultTheme,value:ICategory) => {
    switch (value){
        case ICategory.BUG:
            return theme.colors.bug;

        case ICategory.DEPLOY:
            return theme.colors.deploy;

        case ICategory.FEATURE:
            return theme.colors.feature;

        case ICategory.INFRA:
            return theme.colors.infra;
        
        case ICategory.REFACTOR:
            return theme.colors.refactor;
        
        default:
            return theme.colors.primary;
    }
}
export default getBackgroundColor
