import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  console.log("Color to edit: ", colorToEdit);

  const id = colorToEdit.id;

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

      axiosWithAuth()
      .put(`/colors/${id}`, {...colorToEdit, [e.target.name]: e.target.value})
      .then(window.location.reload(false))
      .catch(err => console.log("Save Err: ", err))

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log("delete color: ",color)
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(window.location.reload(false))
    .catch(err => console.log(err))
    // make a delete request to delete this color

  };

  const handleColorChange = e => {
    setColorToEdit({
      ...setColorToEdit,
      [e.target.name]: e.target.value
    })
  }

  const handleHexChange = e => {
    setColorToEdit({
      ...setColorToEdit,
      [e.target.name]:e.target.value
    })
  }

  const handleColorAdd = e => {
    console.log(e);
    e.preventDefault();
    myFunction();
    axiosWithAuth()
    .post(`/api/colors`, colorToEdit)
    .then(res => console.log(res))
    // .then(window.location.reload(false))
    .catch(err => console.log(err))
  }

  function myFunction() {
    document.getElementsByName("hex").value = "#FF8040";
  }

  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}

      <div className="color-form">
        <form onSubmit={handleColorAdd}>
          <input type="text"
          name="color"
          placeholder="Color Name"
          value={colorToEdit.name}
          onChange={handleColorChange} 
          />

          <input
          type="color"
          name="hex"
          value={colorToEdit.code}
          onChange={handleHexChange}
          />

          <button>Add Color</button>

        </form>
      </div>
    </div>
  );
};

export default ColorList;
