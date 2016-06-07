var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var session = require('express-session')
app.sessionMiddleware = session({
	secret : '$$billz',
	resave : false,
	saveUninitialized : true
})
app.use(app.sessionMiddleware)



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groomer-tools');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	});
});


var bcrypt = require('bcryptjs')
passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username : 'admin'}, function(err, user){
			if(err){ return done(err); }
			if(!user) {
				return done(null, false);
			}

			bcrypt.compare(password, user.password, function(error, response){
				if (response === true) {
					return done(null, user)
				}
				else {
					return done(null, false)
				}
			})
		});
	}
));

app.isAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next()
	}

	console.log('Wrong!')
	res.redirect('/');
}

app.isAuthenticatedAjax = function(req, res, next) {
	if(req.isAuthenticated) {
		return next()
	}

	res.send({error : 'not logged in'});
}

// Must remember to set password manually before deployment

var password = "loseit"

app.get('/', function(req, res) {
	// if(!req.session.count) { req.session.count = 0 }
	res.sendFile('/html/master.html', {root : './public'})
})


app.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
		if(err) {return next(err)}
		if(!user) {return res.send({error : 'Something went wrong'}); }
		req.logIn(user, function(err){
			if(err) {return next(err)}
			return res.send({success : 'success'});
		})
	})(req, res, next);
})


app.get('/admin', app.isAuthenticated, function(req, res) {
	res.sendFile('/html/admin.html', {root : './public'})
})




























var port = 3000
app.listen(port, function(req, res){
	console.log('Server running on port: ' + port)
})