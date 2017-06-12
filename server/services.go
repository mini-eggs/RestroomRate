package restroomrate

import (
	"net/http"

	"github.com/bahlo/goat"
)

func sendErrorMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, map[string]interface{}{
		"message":    message,
		"status":     false,
		"statusCode": 0,
	})
}

func sendSuccessMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, map[string]interface{}{
		"message":    message,
		"status":     true,
		"statusCode": 1,
	})
}
