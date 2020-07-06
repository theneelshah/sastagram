# Sastagram (Instagram clone):

## **[Github Link](https://github.com/theneelshah/sastagram-server)**

## **[Hosted Website](http://sastagram.herokuapp.com/)**

### Features Provided:

- Authentication using JWT - _[Suggested Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4)_
- Profile Page
- See Profiles
- Explore Posts
- Add Post
- Update Profile Picture

### Upcoming Features:

- Follow / unfollow
- Like / unline
- Home page _(showing the posts of followed users)_
- Private / public account

### To Install to your local environment:

**Step 1**: Initial Setup

```
$ cd <project-destination>
$ git clone https://github.com/theneelshah/sastagram-server.git
```

---

**Step 2**: Setting up environment variables
Create a **.env** file in the **home directory** with the following variables:

1. MONGO*URI=<\_Your mongodb database [uri](https://docs.mongodb.com/manual/reference/connection-string/)*>
1. JWT*SECRET=<\_Random string used to encrypt your JWT token for authentication. Ex: **MY_SECRET_AND_ENCRYPTED_STRING***>
1. JWT_EXPIRES_IN=<_Time after your token expires. Ex: **2d** _>
1. NODE_ENV=<**\*development** / production\*>

---

**Step 3**: Installing dependencies

```
$ npm install
$ cd client
$ npm install
```

---

**Step 4**: You're ready to go! (Make sure nodemon is installed globally / on your project)

```
$ npm start
$ cd client
$ npm start
```

Client runs on port **3000** & server on port **4546**
