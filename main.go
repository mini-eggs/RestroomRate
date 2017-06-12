package main

import restroomrate "RestroomRate/server"

func main() {
	serverError := restroomrate.RouterEntry(5000)
	if serverError != nil {
		panic(serverError)
	}
}
