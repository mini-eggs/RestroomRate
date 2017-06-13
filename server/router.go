package restroomrate

import (
	"net/http"

	"strconv"

	"github.com/bahlo/goat"
)

// RouteObject
type routeObject struct {
	router *goat.Router
}

// RouteObject methods
func (aRouteObj *routeObject) initialize() {
	aRouteObj.router = goat.New()
}

func (aRouteObj *routeObject) listen(port int) error {
	return aRouteObj.router.Run(":" + strconv.Itoa(port))
}

func (aRouteObj *routeObject) getRoutes() {
	aRouteObj.router.Get("/", "/", rootHandler)
	aRouteObj.router.Post("/user/create", "/user/create", userCreateHandler)
}

// Core Handlers
func rootHandler(w http.ResponseWriter, r *http.Request, p goat.Params) {
	setHeaderAll(w)
	sendErrorMessage(w, "Homepage")
}

// RouterEntry - TODO
func RouterEntry(port int) error {
	r := new(routeObject)
	r.initialize()
	r.getRoutes()
	return r.listen(port)
}
