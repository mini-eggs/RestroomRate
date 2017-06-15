package restroomrate

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/bahlo/goat"
	jwt "github.com/dgrijalva/jwt-go"
)

var (
	tokenSecret = "A_TOKEN_SECRET"
)

type serverResp struct {
	Message    string
	Status     bool
	StatusCode int
	Token      string
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

func hashString(aString string) (string, error) {
	byteArray, err := bcrypt.GenerateFromPassword([]byte(aString), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(byteArray[:]), nil
}

func createToken(data jwt.MapClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, data)
	return token.SignedString([]byte(tokenSecret))
}

func decodeToken(tokenString string) (*jwt.Token, error) {
	token, parseError := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(tokenSecret), nil
	})
	return token, parseError
}

func getDataFromToken(token *jwt.Token) jwt.MapClaims {
	tokenClaims := token.Claims.(jwt.MapClaims)
	return tokenClaims
}
