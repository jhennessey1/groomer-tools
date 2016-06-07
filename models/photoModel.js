var mongoose = require('mongoose')

var photoSchema = mongoose.Schema({
	title : {type : String, required : true},
	image : {}
})