import Icon, {IconNames} from "shared/icons";
import "./styles.css";

export interface DropdownButton {
    iconName: IconNames;
    color: string;
    action: () => void;
}

interface DropdownProps
{
    disabled: boolean;
    buttons: Array<DropdownButton>;
}

const Dropdown = ({disabled, buttons}: DropdownProps) => {
    return (
        <ul className={`dropdown ${disabled ? "" : "dropdown_show"}`}>
            {buttons.map((button, index) => {
                return <li className="dropdown__button" onClick={button.action} key={index}>
                    <Icon width={50} height={50} color={button.color} name={button.iconName}/>
                </li>
            })}
        </ul>
    )
}

export default Dropdown;