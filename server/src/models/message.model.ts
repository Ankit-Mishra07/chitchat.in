import { Schema,model } from "mongoose";

interface Message {
    sender: Object;
    content: String;
    chat: Object;
    readBy: Array<Object>;
    timestamps: Boolean;
    versionKey: Boolean;
}

const messageSchema = new Schema<Message>(
    {
        sender: { type: Schema.Types.ObjectId, ref: "user" },
        content: { type: String, trim: true },
        chat: { type: Schema.Types.ObjectId, ref: "chat" },
        readBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
      },{
        versionKey: false,
        timestamps: true,
      }
)

const Messages = model<Message>("message",messageSchema);

export default Messages;