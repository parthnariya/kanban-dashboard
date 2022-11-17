import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import getBackgroundColor from "../../helpers/getBackGroundColor";
import ICategory from "../../interfaces/ICategory";
import { BadgeContainer } from "./style";

interface BadgeProps {
    category : ICategory
}
const Badge : React.FC<BadgeProps> = ({category}) => {
    const theme = useContext(ThemeContext);
    const [color,setColor] = useState<string>(theme.colors.primary)

    useEffect(() => {
        if(category){
            const categoryColor = getBackgroundColor(theme,category);
            setColor(categoryColor)
        }
    },[category])
    return <BadgeContainer color={color}>
        <p>{category}</p>
    </BadgeContainer>
}
export default Badge