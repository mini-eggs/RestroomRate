package restroomrate

import (
	"net/http"

	"github.com/bahlo/goat"
)

type serverResp struct {
	Message    string
	Status     bool
	StatusCode int
}

func setHeaderAll(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func sendErrorMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, serverResp{
		Message:    message,
		Status:     false,
		StatusCode: 0,
	})
}

func sendSuccessMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, serverResp{
		Message:    message,
		Status:     true,
		StatusCode: 1,
	})
}
