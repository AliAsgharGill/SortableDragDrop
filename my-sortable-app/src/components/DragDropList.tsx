import React, { FC, useState, forwardRef } from "react";
import { ReactSortable } from "react-sortablejs";
import "./../App.css";

const CustomComponent = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {props.children}
    </div>
  );
});

export const DragAndDropLists: FC = () => {
  const [listOne, setListOne] = useState([
    { id: 1, type: "input", placeholder: "First name" },
    { id: 2, type: "input", placeholder: "Last name" },
    { id: 3, type: "button", text: "Click me" },
    { id: 4, type: "paragraph", text: "This is a paragraph." },
    { id: 5, type: "select", options: ["Option 1", "Option 2", "Option 3"] },
    { id: 6, type: "input", placeholder: "Enter your email" },
    { id: 7, type: "button", text: "Submit" },
  ]);

  const [listTwo, setListTwo] = useState([
    { id: 8, type: "input", placeholder: "Enter your email" },
    { id: 9, type: "button", text: "Submit" },
  ]);

  const cloneItem = (item: any) => ({ ...item, id: Date.now() });

  return (
    <div className="drag-and-drop-container">
      <div className="drag-and-drop-wrapper">
        {/* First list */}
        <div className="list-container">
          <h3>Available Elements</h3>
          <ReactSortable
            group={{
              name: "sharedGroup",
              pull: "clone",
              put: false, // Prevent items from being re-added
            }}
            list={listOne}
            setList={setListOne}
            clone={cloneItem}
          >
            {listOne.map((item) => (
              <CustomComponent key={item.id}>
                {item.type === "input" && (
                  <input
                    type="text"
                    placeholder={item.placeholder}
                    className="input-item"
                  />
                )}
                {item.type === "button" && (
                  <button className="button-item">{item.text}</button>
                )}
                {item.type === "paragraph" && (
                  <p className="paragraph-item">{item.text}</p>
                )}
                {item.type === "select" && (
                  <select className="select-item">
                    {item.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </CustomComponent>
            ))}
          </ReactSortable>
        </div>

        {/* Second list */}
        <div className="list-container">
          <h3>Your Selected Elements</h3>
          <ReactSortable
            group={{
              name: "sharedGroup",
              pull: true,
              put: true,
            }}
            list={listTwo}
            setList={setListTwo}
            removeOnSpill={true}
            fallbackOnBody={true}
          >
            {listTwo.map((item) => (
              <CustomComponent key={item.id}>
                {item.type === "input" && (
                  <input
                    type="text"
                    placeholder={item.placeholder}
                    className="input-item"
                  />
                )}
                {item.type === "button" && (
                  <button className="button-item">{item.text}</button>
                )}
                {item.type === "paragraph" && (
                  <p className="paragraph-item">{item.text}</p>
                )}
                {item.type === "select" && (
                  <select className="select-item">
                    {item.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </CustomComponent>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};
