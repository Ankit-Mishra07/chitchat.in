"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs");
const routes_1 = require("./routes");
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
let store = new MongoDBStore({
    uri: `mongodb+srv://naukri:${process.env.MONGODB_PASSWORD}@cluster0.u9tan.mongodb.net`,
    collection: 'mySessions'
}, (err) => {
    if (err) {
        console.log(err);
    }
});
store.on('connected', () => {
    store.client; // The underlying MongoClient object from the MongoDB driver
});
// Catch errors
store.on('error', function (err) {
    if (err) {
        console.log(err);
    }
});
const app = (0, express_1.default)();
const TWO_HOURS = 1000 * 60 * 60 * 2;
const { NODE_ENV, SESS_NAME, SESS_SECRET, } = process.env;
const IN_PROD = NODE_ENV === 'production';
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    name: SESS_NAME,
    resave: true,
    store,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
        sameSite: true,
        secure: IN_PROD,
    }
}));
app.get("/", (req, res) => {
    return res.send("hello world");
});
app.use("/auth/user", routes_1.userRoutes);
const Port = process.env.PORT;
app.listen(Port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, configs_1.Connect)();
        console.log(`Server is listening on port ${Port}`);
    }
    catch (error) {
        console.log(error);
    }
}));
