import { useState } from "react"
import { images } from "./Images";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currImage = images[currentIndex];
  return (
    <div>
      <img
        src={currImage.src}
        alt={currImage.alt}
        key={currImage.src}
      />
      <button
        aria-label="Previous Image"
        disabled={currentIndex === 0}
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
        }}>
        &#10094;
      </button>
      <div>
        {images.map(({src, alt}, index) => (
          <button
            aria-label={`Select ${alt} Image`}
            key={src}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <button
        aria-label="Next Image"
        disabled={currentIndex === images.length - 1}
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
        }}
      >
        &#10095;
      </button>
    </div>
  )
}

export default ImageCarousel;
