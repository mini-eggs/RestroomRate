package restroomrate

import (
	"io/ioutil"
	"net/http"
	"testing"
	"time"

	"encoding/json"
)

type serverResp struct {
	message string
	status  bool
}

// TestStartingServer - Test starting server and
// making a GET request to the homepage. Ensure we
// receive a status of false
func TestStartingServer(t *testing.T) {
	go func() {
		serverEntryError := RouterEntry(5000)
		if serverEntryError != nil {
			t.Error(serverEntryError)
		}
	}()

	// Wait for server to begin
	time.Sleep(1000)

	getResp, getErr := http.Get("http://localhost:5000/")
	if getErr != nil {
		t.Error(getErr)
	}

	defer getResp.Body.Close()
	body, readErr := ioutil.ReadAll(getResp.Body)
	if readErr != nil {
		t.Error(readErr)
	}

	var data = new(serverResp)
	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		t.Error(jsonErr)
	}

	if data.status != false {
		t.Error("Unexpected response")
	}

}
