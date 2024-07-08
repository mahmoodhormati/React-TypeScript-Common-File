import { Direction } from "../../Enum/EnumMoldels";

export interface ButtonProps {
  Class?: string[];
  Name?: string;
  Icon?: string;
  MyTooltip?: string;
  TooltipPlacement?: Direction;
  IsDisable?: boolean;
  Onclick?: (e?: React.MouseEvent) => void;
  loading?: boolean, setLoading?: React.Dispatch<React.SetStateAction<any>>
}

