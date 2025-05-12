package main

import (
	"encoding/json"
	"fmt"
	"github.com/Knetic/govaluate"
	"log"
	"net/http"
)

type RequestBody struct {
	Expression string `json:"expression"`
}

type ResponseBody struct {
	Result float64 `json:"result"`
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight OPTIONS request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req RequestBody
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	expression, err := govaluate.NewEvaluableExpression(req.Expression)
	if err != nil {
		http.Error(w, "Invalid expression", http.StatusBadRequest)
		return
	}

	result, err := expression.Evaluate(nil)
	if err != nil {
		http.Error(w, "Failed to evaluate expression", http.StatusInternalServerError)
		return
	}

	res := ResponseBody{Result: result.(float64)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	http.HandleFunc("/api/calculate", calculateHandler)
	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
