import { useState } from "react";
import ItemList from "./ItemList";

const DEFAULT_ITEMS_LEFT = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
];

const DEFAULT_ITEMS_RIGHT = [
  'React',
  'Vue',
  'Angular',
  'Svelte',
];

const generateItemsMap = (items) => {
  return new Map(items.map((label) => [label, false]));
}

const hasNoSelectedItems = (items) => {
  return (
    Array.from(items.values()).filter((value) => Boolean(value)).length === 0 
  )
}

const transferAllItems = (srcItems, setSrcItems, destItems, setDestItems) => {
  setDestItems(new Map([...srcItems, ...destItems]));
  setSrcItems(new Map());
}

const transferSelectedItems = (srcItems, setSrcItems, destItems, setDestItems) => {
  const newSrcItems = new Map(srcItems);
  const newDestItems = new Map(destItems);

  newSrcItems.forEach((value, key) => {
    if (value) {
      newDestItems.set(key, false);
      newSrcItems.delete(key);
    }
    setSrcItems(newSrcItems);
    setDestItems(newDestItems);
  });
}

const TransferList = () => {
  const [itemsLeft, setItemsLeft] = useState(generateItemsMap(DEFAULT_ITEMS_LEFT));
  const [itemsRight, setItemsRight] = useState(generateItemsMap(DEFAULT_ITEMS_RIGHT));

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div>
        <button
          disabled={itemsRight.size === 0}
          onClick={() => transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)}
        >
          &lt;&lt;
        </button>
        <button
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={() => transferSelectedItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)}
        >
          &lt;
        </button>
        <button
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={() => transferSelectedItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)}
        >
          &gt;
        </button>
        <button
          disabled={itemsLeft.size === 0}
          onClick={() => transferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)}
        >
          &gt;&gt;
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  )
}

export default TransferList;
