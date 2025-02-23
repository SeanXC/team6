import app from './server';

const PORT = process.env.PORT || 5001;

// Start the server in a separate file
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});