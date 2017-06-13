package restroomrate

import (
	"errors"
	"net/http"

	"github.com/bahlo/goat"
	jwt "github.com/dgrijalva/jwt-go"
)

// User object
type user struct {
	ID       string
	Name     string
	Email    string
	Password string
}

// User methods
func (aUser *user) createNewUser() (user, error) {
	databaseUser := new(user)

	db, dbErr := databaseConnect()
	if dbErr != nil {
		return user{}, dbErr
	}

	createErr := db.Exec(`
		INSERT INTO rr2_users (ID, name, email, password) 
		VALUES (NULL, ?, ?, ?)
	`, aUser.Name, aUser.Email, aUser.Password).Error

	if createErr != nil {
		return user{}, createErr
	}

	findErr := db.Raw(`
		SELECT * FROM rr2_users WHERE email = ?
		ORDER BY id ASC LIMIT 1
	`, aUser.Email).Scan(&databaseUser).Error

	if findErr != nil {
		return user{}, findErr
	}

	defer db.Close()
	return *databaseUser, createErr
}

func (aUser *user) checkExist() error {
	db, dbErr := databaseConnect()
	if dbErr != nil {
		return dbErr
	}

	count := 0
	db.Table("rr2_users").Where("email = ?", aUser.Email).Count(&count)

	if count != 0 {
		return errors.New("User already exists")
	}

	defer db.Close()
	return nil
}

// Handlers
func userCreateHandler(w http.ResponseWriter, r *http.Request, p goat.Params) {
	setHeaderAll(w)

	name := r.FormValue("name")
	email := r.FormValue("email")
	password := r.FormValue("password")

	if len(name) < 1 || len(email) < 1 || len(password) < 1 {
		sendErrorMessage(w, "Required data missing")
		return
	}

	hashedPassword, hashError := hashString(password)
	if hashError != nil {
		sendErrorMessage(w, "Error creating new user")
		return
	}

	userData := user{Name: name, Email: email, Password: hashedPassword}

	alreadyExists := userData.checkExist()
	if alreadyExists != nil {
		sendErrorMessage(w, "User already exists")
		return
	}

	databaseUser, createUserError := userData.createNewUser()
	if createUserError != nil {
		sendErrorMessage(w, "Error creating new user")
		return
	}

	token, tokenErr := createToken(jwt.MapClaims{"ID": databaseUser.ID})
	if tokenErr != nil {
		sendErrorMessage(w, "Error creating user token")
		return
	}

	goat.WriteJSON(w, map[string]interface{}{
		"Message":    "User has been created",
		"Token":      token,
		"Status":     true,
		"StatusCode": 1,
	})
}
