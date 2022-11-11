import { Container, Header, StatusesColumnsContainer, SwitchIcon, TitleAndSwitch } from "./style";
import Switch from "react-switch"
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import SunIcon from "../../assets/sun.png"
import MoonIcon from "../../assets/moon.png" 

interface KanbanDashboardProps {
    toggleTheme:() => void
}

const KanbanDashboard = ({toggleTheme} : KanbanDashboardProps) => {
    const {title,colors} = useContext(ThemeContext)
    const theme = useContext(ThemeContext)
  return (
    <>
      <Container>
        <Header>
            <TitleAndSwitch>
                <h1>Kanban <span>Board</span></h1>
                <Switch 
                    onChange={toggleTheme}
                    checked={title === "light"}
                    checkedIcon={<SwitchIcon src={SunIcon} alt="sun"/>}
                    uncheckedIcon={<SwitchIcon src={MoonIcon} alt="moon"/>}
                    onColor = {colors.primary}
                    offColor = {colors.switch}
                />
            </TitleAndSwitch>
        </Header>
        <StatusesColumnsContainer>
            
        </StatusesColumnsContainer>
      </Container>
    </>
  );
};
export default KanbanDashboard;
