package handler

import (
	"encoding/json"
	"fmt"
	"io"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var a_matrix [][]int
var b_matrix [][]int

func DataFromRequestBody(c *gin.Context) (map[string]string, error) {
	reqBody, err := io.ReadAll(c.Request.Body)
	var body map[string]string
	if err != nil {
		fmt.Println("Error reading body:", err)
	}
	json.Unmarshal(reqBody, &body)

	return body, err
}

func BuildMatrix(c *gin.Context) {
	datas, err := DataFromRequestBody(c)
	if err != nil {
		fmt.Println("Error occured while reading data:", err)
	}

	matrix_row, err := strconv.Atoi(datas["matrix_row"])
	if err != nil {
		fmt.Println("Error while parsing data:", err)
	}

	matrix_column, err := strconv.Atoi(datas["matrix_column"])
	if err != nil {
		fmt.Println("Error while parsing data:", err)
	}

	matrix_number, err := strconv.Atoi(datas["matrix_number"])
	if err != nil {
		fmt.Println("Error while parsing data:", err)
	}

	selected_row, err := strconv.Atoi(datas["selected_row"])
	if err != nil {
		fmt.Println("Error while parsing data:", err)
	}

	selected_column, err := strconv.Atoi(datas["selected_column"])
	if err != nil {
		fmt.Println("Error while parsing data:", err)
	}

	matrix_name := datas["matrix_name"]

	if matrix_name == "a" {
		if len(a_matrix) == 0 {
			a_matrix = make([][]int, matrix_row)
			fmt.Println(a_matrix)
			for i := range a_matrix {
				a_matrix[i] = make([]int, matrix_column)
			}
			a_matrix[selected_row-1][selected_column-1] = matrix_number
		} else {
			a_matrix[selected_row-1][selected_column-1] = matrix_number
		}
	} else {
		if len(b_matrix) == 0 {
			b_matrix = make([][]int, matrix_row)
			fmt.Println(b_matrix)
			for i := range b_matrix {
				b_matrix[i] = make([]int, matrix_column)
			}
			b_matrix[selected_row-1][selected_column-1] = matrix_number
		} else {
			b_matrix[selected_row-1][selected_column-1] = matrix_number
		}
	}

	fmt.Println(a_matrix)
	fmt.Println(b_matrix)

	if matrix_name == "a" {
		c.JSON(http.StatusAccepted, a_matrix)
	} else {
		c.JSON(http.StatusAccepted, b_matrix)
	}
}
