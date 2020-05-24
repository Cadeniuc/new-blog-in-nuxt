const {Strategy, ExtractJwt} = require('passport-jwt')
const  {model} = require('mongoose')
const keys = require('../keys')
const User = model('users')

// Authorization Bearer TOKEN
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
    try {
        const candidate = await User.findByID(payload.userId).select('id')
        if(candidate) {
            done(null, candidate)
        }else {
            done(null, false)
        }
    } catch (e) {
        console.log('Error', e)
    }
})