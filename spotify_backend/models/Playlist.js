const mongoose=require('mongoose')

const Playlist=new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   thumbnal:{
    type:String,
    required:true,
   },
   
   owner:{
    type:mongoose.Types.ObjectId,
    ref:"user",
   },
   song:[
    {
        type:mongoose.Types.ObjectId,
        ref:"song",
    }],
    collaborators:[{
        type:mongoose.Types.ObjectId,
        ref:"User"

    }]
   
})

const PlaylistModel=mongoose.model("Playlist",Playlist)

module.exports=PlaylistModel