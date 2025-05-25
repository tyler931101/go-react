package main

import (
	"fmt"
	"go-react/config"
	"go-react/routes"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	// Initialize the database connection
	config.ConnectDatabase()

	// Set up the Gin router
	r := gin.Default()
	// Enable CORS with default settings
	r.Use(cors.Default()) // This will allow all origins by default

	// Setup routes
	routes.SetupRoutes(r)

	// Run the application
	if err := r.Run(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
