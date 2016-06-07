var mongoose = require('mongoose')

var toolReviewSchema = mongoose.Schema({
	title : {type : String, required : true},
	content : {type : String, required : true},
	date : String,
	image : {},
	type : {type : String, required : true}
})