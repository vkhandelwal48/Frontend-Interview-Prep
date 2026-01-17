import { useState } from "react";

const sections = [
  {
    title: "html",
    value: "html",
    contents: "This is HTML section"
  },
  {
    title: "css",
    value: "css",
    contents: "This is CSS section"
  },
  {
    title: "js",
    value: "js",
    contents: "This is JS section"
  },
];

const Accordion = () => {
  const [openSection, setOpenSection] = useState(new Set());
  return (
    <div>
      <h1>Accordion</h1>
      <div>
        {sections.map(({ title, value, contents }) => {
          const isExpanded = openSection.has(value);
          return (
            <div key={value}>
              <button onClick = {() => {
                const newOpenSection = new Set(openSection);
                newOpenSection.has(value) ? newOpenSection.delete(value) : newOpenSection.add(value);
                setOpenSection(newOpenSection);
              }}>
                {title}
                <div hidden = {!isExpanded}>
                  {contents}
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Accordion;
