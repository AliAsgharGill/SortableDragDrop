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
    { id: 3, type: "paragraph", text: "This is a paragraph." },
    { id: 4, type: "select", options: ["Option 1", "Option 2", "Option 3"] },
    { id: 5, type: "input", placeholder: "Enter your email" },
  ]);

  const [listTwo, setListTwo] = useState([
    { id: 6, type: "input", placeholder: "Enter your email" },
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  const cloneItem = (item: any) => ({ ...item, id: Date.now() });

  const validateForm = () => {
    let newErrors: string[] = [];

    listTwo.forEach((item) => {
      if (item.type === "input") {
        const inputElement = document.getElementById(
          `input-${item.id}`
        ) as HTMLInputElement;
        const value = inputElement?.value.trim();

        if (!value) {
          newErrors.push(`${item.placeholder} is required.`);
        } else if (item.placeholder.toLowerCase().includes("email")) {
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            newErrors.push(`Invalid email format for ${item.placeholder}.`);
          }
        } else {
          // Length validation
          const minLength = 3;
          const maxLength = 20;
          if (value.length < minLength) {
            newErrors.push(
              `${item.placeholder} must be at least ${minLength} characters.`
            );
          }
          if (value.length > maxLength) {
            newErrors.push(
              `${item.placeholder} must be less than ${maxLength} characters.`
            );
          }
        }
      } else if (item.type === "select") {
        const selectElement = document.getElementById(
          `select-${item.id}`
        ) as HTMLSelectElement;
        if (!selectElement || selectElement.value === "") {
          newErrors.push(`Please select an option for ${item.placeholder}`);
        }
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // If validation is successful, you can submit the form
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors.");
    }
  };

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

        {/* Second list with form elements */}
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
                  <div>
                    <input
                      id={`input-${item.id}`}
                      type="text"
                      placeholder={item.placeholder}
                      className="input-item"
                    />
                  </div>
                )}
                {item.type === "button" && (
                  <button className="button-item">{item.text}</button>
                )}
                {item.type === "paragraph" && (
                  <p className="paragraph-item">{item.text}</p>
                )}
                {item.type === "select" && (
                  <div>
                    <select id={`select-${item.id}`} className="select-item">
                      <option value="">Select an option</option>
                      {item.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </CustomComponent>
            ))}
          </ReactSortable>

          {/* Display validation errors */}
          {errors.length > 0 && (
            <div className="validation-errors">
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx} style={{ color: "red" }}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="submit-button"
            style={{
              marginTop: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};
