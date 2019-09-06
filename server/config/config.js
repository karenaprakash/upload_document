const config = {
    production :{
        SECRET : process.env.SECRET,
        DATABASE : 'mongodb://localhost:27017/uploadFile'
    },
    default : {
        SECRET : 'SUPERSECRETPASSWORD123',
        DATABASE : 'mongodb://localhost:27017/uploadFile'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}

//mongodb://rao:raoinfotech@54.185.16.135:27017/meme-generator"