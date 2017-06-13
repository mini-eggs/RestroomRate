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

	formData := url.Values{}
	formData.Set("name", "evan")
	formData.Set("email", "evanjones42@gmail.com")
	formData.Set("password", "HereWeGo")

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
}
