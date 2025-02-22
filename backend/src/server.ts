import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/db';
import './config/passport'; // Import passport config
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(
    session({
        secret: 'your_secret_key', // Change this in production
        resave: false,
        saveUninitialized: false,
    })
); 

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('ConvoCraft Backend is Running');
});

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard'); // Change this for frontend integration
    }
); 

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));