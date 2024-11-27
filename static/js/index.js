"use strict";

const baseURL = "http://localhost:3030";

let a_matrix_rows;
let a_matrix_columns;
let b_matrix_rows;
let b_matrix_columns;
const a_matrix_row_selects = document.getElementById("a_matrix_row_selects");
const a_matrix_column_selects = document.getElementById(
  "a_matrix_column_selects"
);
const b_matrix_row_selects = document.getElementById("b_matrix_row_selects");
const b_matrix_column_selects = document.getElementById(
  "b_matrix_column_selects"
);

document.getElementById("a_matrix_mehet").addEventListener("click", (e) => {
  e.preventDefault();
  a_matrix_rows = document.getElementById("a_matrix_rows").value;
  a_matrix_columns = document.getElementById("a_matrix_columns").value;
  document.getElementById("a_row_span").innerText = a_matrix_rows;
  document.getElementById("a_column_span").innerText = a_matrix_columns;
  while (a_matrix_row_selects.hasChildNodes()) {
    a_matrix_row_selects.removeChild(a_matrix_row_selects.firstChild);
  }
  while (a_matrix_column_selects.hasChildNodes()) {
    a_matrix_column_selects.removeChild(a_matrix_column_selects.firstChild);
  }
  for (let i = 0; i < a_matrix_rows; i++) {
    a_matrix_row_selects.options[a_matrix_row_selects.options.length] =
      new Option(i + 1, i + 1);
  }
  for (let i = 0; i < a_matrix_columns; i++) {
    a_matrix_column_selects.options[a_matrix_column_selects.options.length] =
      new Option(i + 1, i + 1);
  }
});

document.getElementById("b_matrix_mehet").addEventListener("click", (e) => {
  e.preventDefault();
  b_matrix_rows = document.getElementById("b_matrix_rows").value;
  b_matrix_columns = document.getElementById("b_matrix_columns").value;
  if (a_matrix_columns != b_matrix_rows) {
    document.getElementById("matrix_size_error").style.display = "unset";
  } else {
    document.getElementById("b_row_span").innerText = b_matrix_rows;
    document.getElementById("b_column_span").innerText = b_matrix_columns;
    while (b_matrix_row_selects.hasChildNodes()) {
      b_matrix_row_selects.removeChild(b_matrix_row_selects.firstChild);
    }
    while (b_matrix_column_selects.hasChildNodes()) {
      b_matrix_column_selects.removeChild(b_matrix_column_selects.firstChild);
    }
    for (let i = 0; i < b_matrix_rows; i++) {
      b_matrix_row_selects.options[b_matrix_row_selects.options.length] =
        new Option(i + 1, i + 1);
    }
    for (let i = 0; i < b_matrix_columns; i++) {
      b_matrix_column_selects.options[b_matrix_column_selects.options.length] =
        new Option(i + 1, i + 1);
    }
  }
});

document.getElementById("a_matrix_add").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${baseURL}/matrix-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        matrix_row: a_matrix_rows,
        matrix_column: a_matrix_columns,
        selected_row: a_matrix_row_selects.value,
        selected_column: a_matrix_column_selects.value,
        matrix_number: document.getElementById("a_matrix_new_number").value,
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
