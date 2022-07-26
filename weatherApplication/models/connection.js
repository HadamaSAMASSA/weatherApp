var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(
      'mongodb://localhost:27017/weatherApp',
//   'mongodb+srv://DevDams:Blas-LaCapsule91@cluster0.7xyvk.mongodb.net/weatherApp?retryWrites=true&w=majority',
     options,        
     function(err){
       if(err){
      console.error('Erreur de connexion à mongoDB : '+err);
      } else {
        console.log('connecté à la DB')
      }
    }
  );
