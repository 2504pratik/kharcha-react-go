package utils

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	client            *mongo.Client
	UserCollection    *mongo.Collection
	ExpenseCollection *mongo.Collection
)

// Connect establishes a connection to MongoDB and initializes collections
func Connect() error {
	// Load environment variables
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			return fmt.Errorf("error loading .env file: %w", err)
		}
	}

	MONGO_URI := os.Getenv("MONGO_URI")
	if MONGO_URI == "" {
		return fmt.Errorf("MONGO_URI environment variable is not set")
	}

	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Configure client options
	clientOptions := options.Client().ApplyURI(MONGO_URI)

	// Connect to MongoDB
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		return fmt.Errorf("failed to connect to MongoDB: %w", err)
	}

	// Verify the connection
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return fmt.Errorf("failed to ping MongoDB: %w", err)
	}

	// Initialize collections
	db := client.Database("kharchaDB")
	UserCollection = db.Collection("users")
	ExpenseCollection = db.Collection("expenses")

	log.Println("Successfully connected to MongoDB")
	return nil
}

// Disconnect closes the MongoDB connection
func Disconnect() error {
	if client == nil {
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := client.Disconnect(ctx); err != nil {
		return fmt.Errorf("failed to disconnect from MongoDB: %w", err)
	}

	log.Println("Successfully disconnected from MongoDB")
	return nil
}

// GetClient returns the MongoDB client instance
func GetClient() *mongo.Client {
	return client
}

func CreateIndexes() error {
	ctx := context.Background()

	// Indexes for UserCollection
	userIndexes := []mongo.IndexModel{
		{
			Keys:    bson.D{{Key: "username", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
	}

	// Indexes for ExpenseCollection
	expenseIndexes := []mongo.IndexModel{
		{
			Keys: bson.D{
				{Key: "userId", Value: 1},
				{Key: "date", Value: -1},
			},
		},
		{
			Keys: bson.D{
				{Key: "userId", Value: 1},
				{Key: "type", Value: 1},
			},
		},
		{
			Keys: bson.D{
				{Key: "userId", Value: 1},
				{Key: "category", Value: 1},
			},
		},
	}

	if _, err := UserCollection.Indexes().CreateMany(ctx, userIndexes); err != nil {
		return err
	}

	if _, err := ExpenseCollection.Indexes().CreateMany(ctx, expenseIndexes); err != nil {
		return err
	}

	return nil
}
