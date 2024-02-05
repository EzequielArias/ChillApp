import { Document, Types } from "mongoose";

export interface ISessionPayload {
    _id : Types.ObjectId;
    name : string;
    email : string;
    password : string;
    roles : string[];
    img : string;
    __v? : number;
}

/**
 {
  _id: new ObjectId("65368171c62535e3cfd97c6e"),
  name: 'bushimura',
  email: 'bushimura@gmail.com',
  password: '$2a$10$oVydbYLdaTZCRrNtYqE3fOxF/nT9qoRe9KQwgKZrE2ztWX3QOTFWG',
  roles: [],
  img: 'man3.png',
  __v: 0
}

 */