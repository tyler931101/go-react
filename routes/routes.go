package routes

import (
	"github.com/gin-gonic/gin"
	"go-react/controllers"
)

// SetupRoutes sets up all the routes for the application
func SetupRoutes(router *gin.Engine) {
	router.POST("/users", controllers.CreateUser)
	router.GET("/users", controllers.GetUsers)
	router.GET("/users/:id", controllers.GetUserByID)
	router.PUT("/users/:id", controllers.UpdateUser)
	router.DELETE("/users/:id", controllers.DeleteUser)
}