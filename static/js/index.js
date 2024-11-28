"use strict";

const baseURL = "http://localhost:3030";

let matrix_rows;
let matrix_columns;
let matrix_row_value;
let matrix_column_value;
const go_buttons = document.getElementsByClassName("go_button");

const getSelects = (buttonLetter) => {
  const matrix_row_selects = document.getElementById(
    `${buttonLetter}_matrix_row_selects`
  );
  const matrix_column_selects = document.getElementById(
    `${buttonLetter}_matrix_column_selects`
  );
  return [matrix_row_selects, matrix_column_selects]
};

for (const button of go_buttons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let buttonLetter = "";
    e.target.id == "a_matrix_mehet"
      ? (buttonLetter = "a")
      : (buttonLetter = "b");
    matrix_rows = document.getElementById(`${buttonLetter}_matrix_rows`).value;
    matrix_columns = document.getElementById(
      `${buttonLetter}_matrix_columns`
    ).value;
    document.getElementById(`${buttonLetter}_row_span`).innerText = matrix_rows;
    document.getElementById(`${buttonLetter}_column_span`).innerText =
      matrix_columns;
    const selects = getSelects(buttonLetter)
    while (selects[0].hasChildNodes()) {
      selects[0].removeChild(selects[0].firstChild);
    }
    while (selects[1].hasChildNodes()) {
      selects[1].removeChild(selects[1].firstChild);
    }
    for (let i = 0; i < matrix_rows; i++) {
      selects[0].options[selects[0].options.length] =
        new Option(i + 1, i + 1);
    }
    for (let i = 0; i < matrix_columns; i++) {
      selects[1].options[selects[1].options.length] =
        new Option(i + 1, i + 1);
    }
    button.setAttribute("disabled", true)
  });
}

const add_buttons = document.getElementsByClassName("add_button");

for (const button of add_buttons) {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const matrix = e.target.id;
    const selects = getSelects(matrix)
    try {
      const response = await fetch(`${baseURL}/matrix-number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          matrix_name: matrix,
          matrix_row: matrix_rows,
          matrix_column: matrix_columns,
          selected_row: selects[0].value,
          selected_column: selects[1].value,
          matrix_number: document.getElementById(`${matrix}_matrix_new_number`).value,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        response.json().then((data) => {
          console.log(data);
          // a_matrix_row_selects.options[a_matrix_row_selects.value-1].style.backgroundColor = "lightgreen"
          // a_matrix_column_selects.options[a_matrix_column_selects.value-1].style.backgroundColor = "lightgreen"
        });
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  });
}
