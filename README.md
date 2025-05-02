# Creator Dashboard Backend

## 📌 Features

- User authentication with JWT
- Twitter feed aggregation using the Twitter API
- MongoDB integration with Mongoose
- REST API endpoints for login, signup, and Twitter feed
- Ready for deployment on Google Cloud Run

## 🚀 Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/01-Prajwal/vertex-backend-.git
   cd creator-dashboard-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file in the root directory**
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWITTER_BEARER_TOKEN=your_twitter_bearer_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```



## 🐳 Deployment (Google Cloud Run)

1. **Build the Docker image**
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/node-backend .
   ```

2. **Push the image to Google Container Registry**
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/node-backend
   ```

3. **Deploy to Google Cloud Run**
   ```bash
   gcloud run deploy node-backend \
     --image gcr.io/YOUR_PROJECT_ID/node-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars=MONGO_URI=your_mongo_uri,JWT_SECRET=your_jwt_secret,TWITTER_BEARER_TOKEN=your_token
   ```

4. **Access the deployed backend**
   - Deployed URL: https://node-backend-660228117993.us-central1.run.app
   - Use this URL to connect from your frontend.





## 👨‍💻 Author

Prajwal - [GitHub](https://github.com/01-Prajwal)
