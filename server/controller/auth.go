package controller

import (
	"context"
	"kharch-go/middleware"
	"kharch-go/model"
	"kharch-go/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var user model.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Check if username already exists
	existingUser := model.User{}
	err := utils.UserCollection.FindOne(context.Background(), bson.M{"username": user.Username}).Decode(&existingUser)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{"error": "Username already exists"})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user.ID = primitive.NewObjectID()
	user.Password = string(hashedPassword)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = utils.UserCollection.InsertOne(ctx, user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	// Create JWT token
	token, err := middleware.CreateToken(user.ID.Hex())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create token"})
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(30 * 24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Secure = false
	cookie.SameSite = "Strict"

	c.Cookie(cookie)

	return c.Status(201).JSON(fiber.Map{
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

func Login(c *fiber.Ctx) error {
	var input model.LoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	var user model.User
	err := utils.UserCollection.FindOne(context.Background(), bson.M{"username": input.Username}).Decode(&user)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Compare password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Create JWT token
	token, err := middleware.CreateToken(user.ID.Hex())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create token"})
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(30 * 24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Secure = false
	cookie.SameSite = "Strict"

	c.Cookie(cookie)

	return c.Status(200).JSON(fiber.Map{
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

func Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:    "token",
		Value:   "",
		Expires: time.Now().Add(-time.Hour),
	})
	return c.SendStatus(200)
}
