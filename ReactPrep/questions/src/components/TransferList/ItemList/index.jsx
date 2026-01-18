import CheckboxItem from "../CheckboxItem"

const ItemList = ({ items, setItems }) => {
  return (
    <div>
      <ul>
        {Array.from(items.entries()).map(
          ([label, checked]) => (
            <li key={label}>
              <CheckboxItem
                label={label}
                checked={checked}
                onChange={() => {
                  const newItems = new Map(items);
                  newItems.set(label, !items.get(label));
                  setItems(newItems);
                }}
              />
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default ItemList;
