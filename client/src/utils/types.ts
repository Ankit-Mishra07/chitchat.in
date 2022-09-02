export type SearchedUser = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profile_avatar_url: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ChatType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: string[];
  createdAt: string;
  updatedAt: string;
  latestMessage: string;
};

export type MessageType = {
  _id: string;
  sender: SearchedUser;
  content: string;
  chat: ChatType;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
};
