package config

import (
	"fmt"
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"go-react/models" // import your models
)

// DB variable to hold the database connection
var DB *gorm.DB

// ConnectDatabase function to initialize the database connection
func ConnectDatabase() {
	var err error
	dsn := "root:@tcp(127.0.0.1:3306)/go-react?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	// Automatically migrate the models (Create/Update tables)
	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("AutoMigrate failed:", err)
	}
	
	fmt.Println("Database connected successfully")
}