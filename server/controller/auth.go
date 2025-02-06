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

	existingUser := model.User{}
	err := utils.UserCollection.FindOne(context.Background(), bson.M{"username": user.Username}).Decode(&existingUser)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{"error": "Username already exists"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user.ID = primitive.NewObjectID()
	user.Password = string(hashedPassword)

	_, err = utils.UserCollection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	accessToken, refreshToken, err := middleware.CreateTokenPair(user.ID.Hex())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create tokens"})
	}

	// Set refresh token in HTTP-only cookie
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/",
	})

	return c.Status(201).JSON(fiber.Map{
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
		},
		"access_token": accessToken,
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

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	accessToken, refreshToken, err := middleware.CreateTokenPair(user.ID.Hex())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create tokens"})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/",
	})

	return c.Status(200).JSON(fiber.Map{
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
		},
		"access_token": accessToken,
	})
}

func Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/",
	})
	return c.SendStatus(200)
}

func RefreshToken(c *fiber.Ctx) error {
	refreshToken := c.Cookies("refresh_token")
	if refreshToken == "" {
		return c.Status(401).JSON(fiber.Map{"error": "No refresh token provided"})
	}

	userId, err := middleware.ValidateRefreshToken(refreshToken)
	if err != nil {
		c.Cookie(&fiber.Cookie{
			Name:     "refresh_token",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HTTPOnly: true,
			Secure:   true,
			SameSite: "None",
			Path:     "/",
		})
		return c.Status(401).JSON(fiber.Map{"error": "Invalid refresh token"})
	}

	// Generate new token pair
	accessToken, newRefreshToken, err := middleware.CreateTokenPair(userId)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create tokens"})
	}

	// Set new refresh token
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    newRefreshToken,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/",
	})

	return c.JSON(fiber.Map{
		"access_token": accessToken,
	})
}
