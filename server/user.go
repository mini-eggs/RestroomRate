package restroomrate

import (
	"net/http"

	"github.com/bahlo/goat"
)

func userCreateHandler(w http.ResponseWriter, r *http.Request, p goat.Params) {
	setHeaderAll(w)

	name := r.FormValue("name")
	email := r.FormValue("email")
	password := r.FormValue("password")

	if len(name) < 1 || len(email) < 1 || len(password) < 1 {
		sendErrorMessage(w, "Required data missing")
		return
	}

	sendSuccessMessage(w, "User has been created")
}
