package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Expense struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID    primitive.ObjectID `json:"userId" bson:"userId" binding:"required"`
	Title     string             `json:"title" bson:"title" binding:"required"`
	Amount    float64            `json:"amount" bson:"amount" binding:"required"`
	Date      string             `json:"date" bson:"date" binding:"required"`
	People    []string           `json:"people" bson:"people"`
	Category  string             `json:"category" bson:"category"` // For future categorization
	Type      string             `json:"type" bson:"type"`         // "expense" or "income"
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
}
