package handler

import (
	"encoding/json"
	"fmt"
	"io"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var matrix [][]int

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

	if len(matrix) == 0 {
		matrix = make([][]int, matrix_row)
		fmt.Println(matrix)
		for i := range matrix {
			matrix[i] = make([]int, matrix_column)
		}
		matrix[selected_row-1][selected_column-1] = matrix_number
	} else {
		matrix[selected_row-1][selected_column-1] = matrix_number
	}

	fmt.Println(matrix)
	fmt.Println(selected_column)
	fmt.Println(matrix)
	c.JSON(http.StatusAccepted, matrix)
}
