package restroomrate

import (
	"net/http"

	"strconv"

	"github.com/bahlo/goat"
)

func getRouter() *goat.Router {
	r := goat.New()
	return r
}

func startListening(r *goat.Router, port int) error {
	return r.Run(":" + strconv.Itoa(port))
}

func rootHandler(w http.ResponseWriter, r *http.Request, p goat.Params) {
	sendErrorMessage(w, "Homepage")
}

func initializeRoutes(r *goat.Router) {
	r.Get("/", "/", rootHandler)
}

// RouterEntry - TODO
func RouterEntry(port int) error {
	r := getRouter()
	initializeRoutes(r)
	return startListening(r, port)
}
