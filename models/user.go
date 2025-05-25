package models

import (
	"time"
	"gorm.io/gorm"
)

// User represents the structure of the user table
type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	// Email     string    `json:"email" gorm:"unique"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.CreatedAt = time.Now()
	return nil
}