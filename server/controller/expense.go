package controller

import (
	"context"
	"kharch-go/model"
	"kharch-go/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetExpenses - Get all expenses for logged-in user
func GetExpenses(c *fiber.Ctx) error {
	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var expenses []model.Expense
	cursor, err := utils.ExpenseCollection.Find(context.Background(),
		bson.M{"userId": userID})

	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var expense model.Expense
		if err := cursor.Decode(&expense); err != nil {
			return err
		}
		expenses = append(expenses, expense)
	}

	return c.Status(200).JSON(expenses)
}

// GetExpense - Get single expense (only if it belongs to logged-in user)
func GetExpense(c *fiber.Ctx) error {
	expenseID, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid expense ID"})
	}

	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var expense model.Expense
	err = utils.ExpenseCollection.FindOne(context.Background(),
		bson.M{
			"_id":    expenseID,
			"userId": userID,
		}).Decode(&expense)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Expense not found"})
	}

	return c.Status(200).JSON(expense)
}

// CreateExpense - Create expense for logged-in user
func CreateExpense(c *fiber.Ctx) error {
	var expense model.Expense

	if err := c.BodyParser(&expense); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	expense.ID = primitive.NewObjectID()
	expense.UserID = userID
	expense.CreatedAt = time.Now()
	expense.UpdatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = utils.ExpenseCollection.InsertOne(ctx, expense)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create expense"})
	}

	return c.Status(201).JSON(expense)
}

// UpdateExpense - Update expense (only if it belongs to logged-in user)
func UpdateExpense(c *fiber.Ctx) error {
	expenseID, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid expense ID"})
	}

	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var updateData map[string]interface{}
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// Prevent changing protected fields
	delete(updateData, "_id")
	delete(updateData, "userId")
	delete(updateData, "createdAt")

	// Add updatedAt timestamp
	updateData["updatedAt"] = time.Now()

	update := bson.M{"$set": updateData}

	result, err := utils.ExpenseCollection.UpdateOne(
		context.Background(),
		bson.M{
			"_id":    expenseID,
			"userId": userID,
		},
		update,
	)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update expense"})
	}

	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Expense not found"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Expense updated successfully"})
}

// DeleteExpense - Delete expense (only if it belongs to logged-in user)
func DeleteExpense(c *fiber.Ctx) error {
	expenseID, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid expense ID"})
	}

	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	result, err := utils.ExpenseCollection.DeleteOne(
		context.Background(),
		bson.M{
			"_id":    expenseID,
			"userId": userID,
		},
	)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete expense"})
	}

	if result.DeletedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Expense not found"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Expense deleted successfully"})
}
