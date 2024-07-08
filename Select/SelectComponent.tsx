import Select from "react-select";
import { SelectProps } from "./SelectProps";
import "./Select.scss";
import { useTranslation } from 'react-i18next'


function MultiSelectComponent({
  Name,
  PlaceHolder,
  Value,
  Option,
  Multi,
  HandelChange,
  IsGrouping = false,
  IsDisabel
}: SelectProps) {
  const { t } = useTranslation()
  let options = Multi ? [{ label: `${t('all')}`, value: "all" }, ...Option] : Option;

  let groupingOption = Option;


  return (
    <div
      className={`SelectComponent labelOnDiv react-select-wrapper ${Multi ? "multi" : ""} `}
    >

      {Name && <label>{Name} </label>}
      <Select
       maxMenuHeight={200}
      menuShouldScrollIntoView={true}
        name={Name}
        placeholder={PlaceHolder}
        options={IsGrouping ? groupingOption : options}
        isMulti={Multi}
        value={Value ? Value : null}
        formatOptionLabel={option => (<div className="SelectImage" style={option.image ? { backgroundImage: ` url(${option.image})` } : {}}>
          <span>{option.label}</span>
        </div>)}
        onChange={(selected: any) => {
          Multi &&
            selected.length &&
            selected.find((option: any) => option.value === "all")
            ? HandelChange(options.slice(1))
            : !Multi
              ? HandelChange((selected && selected) || null)
              : HandelChange(selected);
        }}
        isDisabled={IsDisabel === undefined ? false : IsDisabel}
      />

    </div>

  );
}

export default MultiSelectComponent;
