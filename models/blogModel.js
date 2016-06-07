var mongoose = require('mongoose')

var blogSchema = mongoose.Schema({
	title : {type : String, required : true, unique : true},
	content : {type : String, required : true},
	date : String,
	image : {}
})