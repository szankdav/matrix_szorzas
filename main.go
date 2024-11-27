package main

import (
	"net/http"

	handler "example.com/matrix-szorzas/internal/api/http/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	e := gin.Default()
	e.LoadHTMLGlob("templates/*")
	e.Static("/static", "./static")

	e.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	e.POST("/matrix-number", handler.BuildMatrix)

	e.Run(":3030")
}
