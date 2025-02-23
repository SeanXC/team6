# Config Folder

## Overview

The `config/` folder contains configuration files for the backend. These files help set up database connections, authentication settings, and environment variables.

## Structure

```
config/
├── db.ts         # Database connection setup
├── passport.ts   # Google OAuth authentication configuration
```

## Key Functionalities

### 1. **Database Configuration (`db.ts`)**

- Connects to MongoDB using Mongoose.
- Loads the database URL from environment variables.
- Handles connection errors and logs successful connections.

#### Example

```ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
```

### 2. **Passport Configuration (`passport.ts`)**

- Configures Google OAuth using Passport.js.
- Extracts user profile details and links with MongoDB.

#### Example

```ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
```

## Environment Variables

These configuration files rely on environment variables stored in `.env`. Ensure you set up the following:

```
MONGO_URI=mongodb+srv://your_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
