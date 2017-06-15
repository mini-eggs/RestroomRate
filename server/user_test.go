package restroomrate

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"testing"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// TestCreateUser - test creating a new user
func TestCreateUser(t *testing.T) {
	// Start server and continue.
	go func() {
		serverEntryError := RouterEntry(5001)
		if serverEntryError != nil {
			t.Error(serverEntryError)
		}
	}()

	// Wait for server to begin.
	time.Sleep(1000)

	milli := time.Now().UnixNano() / int64(time.Millisecond)
	aPassword := "HereWeGo"

	formData := url.Values{}
	formData.Set("name", "evan")
	formData.Set("email", strconv.FormatInt(milli, 10)+"@gmail.com")
	formData.Set("password", aPassword)

	client := &http.Client{}
	req, reqErr := http.NewRequest("POST", "http://localhost:5001/user/create", bytes.NewBufferString(formData.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Content-Length", strconv.Itoa(len(formData.Encode())))
	if reqErr != nil {
		t.Error(reqErr)
	}

	resp, respErr := client.Do(req)
	if respErr != nil {
		t.Error(respErr)
	}

	defer resp.Body.Close()
	body, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		t.Error(bodyErr)
	}

	var data = new(serverResp)
	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		t.Error(jsonErr)
	}

	if data.Status == false {
		t.Error(data.Message)
	}

	decodedToken, decodeError := decodeToken(data.Token)
	if decodeError != nil {
		t.Error("Invalid token")
	}

	tokenData := getDataFromToken(decodedToken)
	userStringID := tokenData["ID"].(string)
	aUser := user{ID: userStringID}

	userData, getUserErr := aUser.getUserByID()
	if getUserErr != nil {
		t.Error("Error receiving user from database")
	}

	/*
		At this point user has been create successfully
		and receiving their information with a token has
		worked. Now lets test if we can sign in with that
		same taken and perform password matches.
	*/

	hashedPassword := []byte(userData.Password)
	bytePassword := []byte(aPassword)
	passwordCompareError := bcrypt.CompareHashAndPassword(hashedPassword, bytePassword)
	if passwordCompareError != nil {
		t.Error("Incorrect password")
	}

	/*
		The user has successfully signed up,
		received their user data via token,
		and signed in with hash password matching.append
	*/
}
