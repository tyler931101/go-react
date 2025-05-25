package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"go-react/config"
	"go-react/models"
)

// CreateUser creates a new user
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUsers fetches all users
func GetUsers(c *gin.Context) {
	// Get page, limit, and search query parameters from the URL
	page := c.DefaultQuery("page", "1")      // Default to page 1 if not provided
	limit := c.DefaultQuery("limit", "10")   // Default to limit 10 if not provided
	search := c.DefaultQuery("search", "")   // Default to an empty search if not provided

	// Convert page and limit to integer
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit number"})
		return
	}

	// Calculate the offset for pagination
	offset := (pageInt - 1) * limitInt

	// Prepare the query for users
	var users []models.User

	// Build the query for pagination and search
	query := config.DB.Model(&models.User{})
	if search != "" {
		// Simple search for first_name, last_name, or email
		query = query.Where("first_name LIKE ? OR last_name LIKE ? OR email LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%")
	}

	// Get the total number of users for pagination calculation
	var totalCount int64
	if err := query.Count(&totalCount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count users"})
		return
	}

	// Fetch the paginated users
	if err := query.Offset(offset).Limit(limitInt).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	// Return the paginated result with total count, page, and limit
	c.JSON(http.StatusOK, gin.H{
		"users":      users,
		"total_count": totalCount,
		"page":        pageInt,
		"limit":       limitInt,
	})
}

// GetUserByID fetches a user by ID
func GetUserByID(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with ID %s not found", id)})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser updates a user's details
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser deletes a user by ID
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.User{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}