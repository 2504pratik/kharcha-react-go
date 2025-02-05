package middleware

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type TokenType string

const (
	AccessToken  TokenType = "access"
	RefreshToken TokenType = "refresh"
)

func createToken(userId string, tokenType TokenType) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userId
	claims["type"] = string(tokenType)

	switch tokenType {
	case AccessToken:
		claims["exp"] = time.Now().Add(15 * time.Minute).Unix() // 15 minutes
	case RefreshToken:
		claims["exp"] = time.Now().Add(7 * 24 * time.Hour).Unix() // 7 days
	}

	secret := []byte(os.Getenv("JWT_SECRET"))
	return token.SignedString(secret)
}

func CreateTokenPair(userId string) (string, string, error) {
	accessToken, err := createToken(userId, AccessToken)
	if err != nil {
		return "", "", err
	}

	refreshToken, err := createToken(userId, RefreshToken)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func AuthMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if len(authHeader) <= 7 || authHeader[:7] != "Bearer " {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid authorization header"})
	}

	tokenString := authHeader[7:]

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims := token.Claims.(jwt.MapClaims)
	if claims["type"] != string(AccessToken) {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token type"})
	}

	c.Locals("user_id", claims["user_id"])
	return c.Next()
}

func ValidateRefreshToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	claims := token.Claims.(jwt.MapClaims)
	if claims["type"] != string(RefreshToken) {
		return "", jwt.ErrInvalidType
	}

	return claims["user_id"].(string), nil
}
