package restroomrate

import "testing"

func TestDatabaseConnect(t *testing.T) {
	_, err := databaseConnect()
	if err != nil {
		t.Error(err)
	}
}
