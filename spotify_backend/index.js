const express=require('express')
const app=express()
const mongoose=require('mongoose')
const port=8000
const passport =require("passport")
const User=require("./models/User.js")
const authRoutes =require('./router/auth');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

app.use(express.json());

mongoose.connect(
    "mongodb+srv://santunupadhy2:1Mv20mc042@mernapp.vixpshp.mongodb.net/MARNAPP?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUniFiedTopology:true,
    })
    .then((x)=>{
        console.log("connected to mongo")
    })
    .catch((err)=>{
        console.log("error not connected")
    })

//setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use('/auth',authRoutes)

app.listen(port,()=>{
    console.log(`app start in $(port)`)
})