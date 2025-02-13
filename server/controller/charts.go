package controller

import (
	"context"
	"kharch-go/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MonthlyExpenseData struct {
	Month   string `json:"month"`
	Earning int    `json:"earning"`
	Expense int    `json:"expense"`
}

func GetPieChartData(c *fiber.Ctx) error {
	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	// Calculate start and end of last month
	now := time.Now()
	lastMonthStart := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, time.UTC)
	lastMonthEnd := lastMonthStart.AddDate(0, 1, -1)

	// Aggregation pipeline to group expenses by category
	pipeline := []bson.M{
		{
			"$match": bson.M{
				"userId": userID,
				"type":   "expense",
				"date": bson.M{
					"$gte": lastMonthStart.Format("2006-01-02"),
					"$lte": lastMonthEnd.Format("2006-01-02"),
				},
			},
		},
		{
			"$group": bson.M{
				"_id":    "$category",
				"amount": bson.M{"$sum": "$amount"},
			},
		},
		{
			"$project": bson.M{
				"category": "$_id",
				"amount":   1,
				"_id":      0,
			},
		},
	}

	cursor, err := utils.ExpenseCollection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch pie chart data"})
	}
	defer cursor.Close(context.Background())

	var pieChartData []fiber.Map
	if err = cursor.All(context.Background(), &pieChartData); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to process pie chart data"})
	}

	return c.Status(200).JSON(pieChartData)
}

func GetExpenseGraphData(c *fiber.Ctx) error {
	userID, err := primitive.ObjectIDFromHex(c.Locals("user_id").(string))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	// Calculate date range for last 6 months
	now := time.Now()
	startDate := time.Date(now.Year(), now.Month()-5, 1, 0, 0, 0, 0, time.UTC)
	endDate := time.Date(now.Year(), now.Month()+1, 0, 23, 59, 59, 999999999, time.UTC)

	// Aggregation pipeline to group expenses by month and type
	pipeline := []bson.M{
		{
			"$match": bson.M{
				"userId": userID,
				"date": bson.M{
					"$gte": startDate.Format("2006-01-02"),
					"$lte": endDate.Format("2006-01-02"),
				},
			},
		},
		{
			"$addFields": bson.M{
				"monthYear": bson.M{
					"$substr": []interface{}{
						"$date",
						0,
						7, // Get YYYY-MM portion of the date
					},
				},
			},
		},
		{
			"$group": bson.M{
				"_id": bson.M{
					"month": "$monthYear",
					"type":  "$type",
				},
				"total": bson.M{"$sum": "$amount"},
			},
		},
		{
			"$group": bson.M{
				"_id": "$_id.month",
				"data": bson.M{
					"$push": bson.M{
						"type":   "$_id.type",
						"amount": "$total",
					},
				},
			},
		},
		{
			"$sort": bson.M{
				"_id": 1,
			},
		},
	}

	cursor, err := utils.ExpenseCollection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch expense graph data"})
	}
	defer cursor.Close(context.Background())

	var rawData []bson.M
	if err = cursor.All(context.Background(), &rawData); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to process expense graph data"})
	}

	// Transform the data into the required format
	monthNames := []string{"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"}

	result := make([]MonthlyExpenseData, 0)
	for _, item := range rawData {
		monthYear := item["_id"].(string)
		t, _ := time.Parse("2006-01", monthYear)
		monthData := MonthlyExpenseData{
			Month:   monthNames[t.Month()-1],
			Earning: 0,
			Expense: 0,
		}

		// Process the data array
		dataArray := item["data"].(primitive.A)
		for _, d := range dataArray {
			data := d.(bson.M)
			amount := int(data["amount"].(float64))
			if data["type"].(string) == "income" {
				monthData.Earning = amount
			} else {
				monthData.Expense = amount
			}
		}

		result = append(result, monthData)
	}

	return c.Status(200).JSON(result)
}
