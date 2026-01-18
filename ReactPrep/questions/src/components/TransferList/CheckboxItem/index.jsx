import { useId } from "react";

const CheckboxItem = ({ label, checked, onChange }) => {
  const id = useId();
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckboxItem;
