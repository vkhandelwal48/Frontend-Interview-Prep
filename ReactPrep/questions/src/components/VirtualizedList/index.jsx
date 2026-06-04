import React, { useState } from "react";
import './styles.css';

const VirtualizedList = ({ items, itemHeight, height }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  const offsetY = startIndex * itemHeight;
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      className="virtualized-container"
      style={{ height }}
      onScroll={handleScroll}
    >
      <div className="virtualized-wrapper" style={{ height: totalHeight }}>
        <div
          className="virtualized-items-container"
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              className="virtualized-item"
              style={{
                height: itemHeight,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;