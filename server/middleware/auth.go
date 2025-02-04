package middleware

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func CreateToken(userId string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userId
	claims["exp"] = time.Now().Add(30 * 24 * time.Hour).Unix() // 30 days

	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func AuthMiddleware(c *fiber.Ctx) error {
	token := c.Cookies("token")
	if token == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}

	parsedToken, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !parsedToken.Valid {
		c.ClearCookie("token")
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims := parsedToken.Claims.(jwt.MapClaims)
	c.Locals("user_id", claims["user_id"])
	return c.Next()
}
