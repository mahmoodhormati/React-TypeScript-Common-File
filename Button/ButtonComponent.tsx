import { ButtonProps } from "./ButtonProps";
import { useRef, useEffect } from "react";
import { Tooltip } from 'bootstrap';
import "./Button.scss";
import { Direction } from "../../Enum/EnumMoldels";
import { useTranslation } from 'react-i18next'
import { useAppSelector } from "../../Services/Store/ReduxHooks";

const ButtonComponent = ({
  Name,
  Icon,
  Class,
  MyTooltip,
  TooltipPlacement,
  IsDisable,
  Onclick,
  loading


}: ButtonProps) => {


  const { t } = useTranslation()
  const lang = useAppSelector(state => state.Language)
  const tooltipRef: any = useRef();

  useEffect((): ReturnType<React.EffectCallback> => {
  let tooltip= new Tooltip(tooltipRef.current, {
      title: `${MyTooltip? t(`${MyTooltip}`):''}`,
      placement: `${TooltipPlacement ? TooltipPlacement : Direction.Up}`,
      trigger: 'hover focus',
      customClass:'linebreak',
      
      
      
    })

    return (): void => {
      tooltip.hide()

    }
  }, [lang])
  return (
    <button
      type="button"
      className={`buttonComponent  ${Class?.join(" ")}`}
      ref={tooltipRef}

      disabled={IsDisable ? IsDisable : false}
      onClick={(e) => {

        Onclick !== undefined && Onclick(e);

      }}
    >
      {Icon && <i className={`fa ${Icon}`}></i>}

      {!loading && Name?.length !== 0 && Name}

      {loading && (
        <div
          className="spinner-border text-warning spinner-border-sm "
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </button>
  );
};

export default ButtonComponent;
