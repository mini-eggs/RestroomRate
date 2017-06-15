package restroomrate

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// Don't forget to defer db.Close()

func databaseConnect() (*gorm.DB, error) {
	connectionInfo := "root:root@tcp(127.0.0.1:8889)/restroomrate"
	connectionSettings := "?charset=utf8&parseTime=True&loc=Local"
	return gorm.Open("mysql", connectionInfo+connectionSettings)
}
