import "dotenv/config";
import express from "express";
import { Connect } from "./configs";
import { userRoutes,chatRoutes, messageRoutes } from "./routes";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from 'connect-mongodb-session';
import {Server, Socket} from "socket.io";
  

const MongoDBStore = connectMongo(session)
let store = new MongoDBStore({
  uri: `mongodb+srv://naukri:${process.env.MONGODB_PASSWORD}@cluster0.u9tan.mongodb.net`,
  collection: 'mySessions'
}, (err) => {
    if(err) {
        console.log(err);
    }
});

store.on('connected', () => {
  store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function(err) {
    if(err) {
        console.log(err);
    }
});

const app = express();

const TWO_HOURS = 1000*60*60*2;

const {
    NODE_ENV,
    SESS_NAME ,
    SESS_SECRET,
} = process.env;

const IN_PROD = NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(session({

    name: SESS_NAME,
    resave: true,
    store,
    saveUninitialized:true,
    secret:SESS_SECRET,
    cookie: {
      sameSite: true ,
      secure: IN_PROD,
    }
}))


app.get("/",(req,res) => {
    return res.send("hello world")
})

app.use("/auth/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/messsage",messageRoutes)

const Port = process.env.PORT;

const server = app.listen(Port,async() => {
    try {
        await Connect()
        console.log(`Server is listening on port ${Port}`)
    } catch (error) {
        console.log(error)
    }
})

const io = new Server(server,{
    pingTimeout: 60000,
    cors: {
        origin: "https://chitchat-backendapi.herokuapp.com"
    }
})

io.on("connection",(socket) => {
    console.log("connected to socket.io");
    socket.on("setup",(userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })
    
    socket.on("join chat",(room) => {
        socket.join(room);
        console.log("User joined the room "+room)
    })

    socket.on("new message",(newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        
        if(!chat.users) return console.log("chat.users not defined");
        
        chat.users.map((user:Object&{_id:string}) => {
            if(user._id === newMessageRecieved.sender._id) return ;

            socket.in(user._id).emit("message recieved",newMessageRecieved)
        })
    })

    socket.on("typing",(room) => socket.in(room).emit("typing"));
    socket.on("stop typing",(room) => socket.in(room).emit("stop typing"))

    socket.off("setup", (userData) => {
        console.log("User Disconnected");
        socket.leave(userData._id)
    })

})
