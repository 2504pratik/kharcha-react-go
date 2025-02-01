package main

import (
	"kharch-go/controller"
	"kharch-go/middleware"
	"kharch-go/utils"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {

	if os.Getenv("ENV") != "production" {
		// Load .env file when not in production
		if err := godotenv.Load(".env"); err != nil {
			log.Fatal("Error loading .env file: ", err)
		}
	}

	app := fiber.New()

	if os.Getenv("ENV") == "development" {
		app.Use(cors.New(cors.Config{
			AllowOrigins: "*",
			AllowMethods: "GET,POST,PATCH,DELETE",
		}))
	}

	// Connect to MongoDB
	if err := utils.Connect(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	defer utils.Disconnect()

	app.Post("/api/auth/register", controller.Register)
	app.Post("/api/auth/login", controller.Login)

	app.Get("/api/expenses", middleware.AuthMiddleware, controller.GetExpenses)
	app.Get("/api/expenses/:id", middleware.AuthMiddleware, controller.GetExpense)
	app.Post("/api/expenses", middleware.AuthMiddleware, controller.CreateExpense)
	app.Put("/api/expenses/:id", middleware.AuthMiddleware, controller.UpdateExpense)
	app.Delete("/api/expenses/:id", middleware.AuthMiddleware, controller.DeleteExpense)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "3000"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist")
	}
	log.Fatal(app.Listen(":" + PORT))
}
