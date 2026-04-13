<<<<<<< HEAD
# Agricultural Advisor Web Application

A comprehensive web application that helps farmers choose suitable crops and irrigation processes using live web-scraped agricultural data.

## Features

### 🌱 Core Functionality
- **Multi-language Support**: English, Telugu, and Hindi interfaces
- **Farmer Registration & Authentication**: Secure registration and login system
- **Farming Record Management**: Create, view, modify, and delete farming records (max 3 per farmer)
- **Live Research Engine**: Real-time agricultural data scraping and analysis
- **Smart Recommendations**: Personalized crop and irrigation recommendations
- **PDF Report Generation**: Downloadable research results

### 📱 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Step-by-step workflows for complex processes
- **Visual Progress Indicators**: Clear feedback during operations
- **Multilingual Interface**: Seamless language switching

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **Mongoose** for ODM
- **Cheerio** for web scraping
- **PDFKit** for PDF generation
- **i18next** for internationalization

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **react-i18next** for frontend translations

## Project Structure

```
Wim_project/
├── backend/
│   ├── models/
│   │   ├── Farmer.js
│   │   ├── FarmingRecord.js
│   │   └── ResearchResult.js
│   ├── routes/
│   │   ├── farmers.js
│   │   ├── farming.js
│   │   └── research.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── FarmerRegistration.jsx
│   │   │   ├── FarmerLogin.jsx
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── NewFarmingForm.jsx
│   │   │   ├── FarmingRecords.jsx
│   │   │   └── ResearchResults.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── .env
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wim_project
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/agriculture_app
   WEATHER_API_KEY=your_weather_api_key_here
   ```

5. **Start MongoDB**
   ```bash
   # If MongoDB is installed locally
   mongod --dbpath ./mongodb-data
   
   # Or use MongoDB Atlas connection string in .env
   ```

6. **Run the application**
   ```bash
   # Start backend server
   npm run server
   
   # In another terminal, start frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Farmer Management
- `POST /api/farmers/register` - Register new farmer
- `GET /api/farmers/by-address/:address` - Get farmers by address
- `POST /api/farmers/login` - Farmer login

### Farming Records
- `POST /api/farming` - Create new farming record
- `GET /api/farming/farmer/:farmerId` - Get all records for farmer
- `PUT /api/farming/:id` - Update farming record
- `DELETE /api/farming/:id` - Delete farming record

### Research Engine
- `POST /api/research/analyze/:farmingRecordId` - Analyze farming data
- `GET /api/research/result/:resultId` - Get research result
- `GET /api/research/pdf/:resultId` - Download PDF report

## Usage Workflow

### For New Farmers
1. Visit landing page and select "New Farmer"
2. Complete registration form with personal details
3. Login using the multi-step verification process
4. Create farming records with detailed information
5. Run research analysis to get recommendations

### For Existing Farmers
1. Visit landing page and select "Existing Farmer"
2. Enter address to find your record
3. Verify mobile number
4. Select your name from the list
5. Enter password to access dashboard
6. Manage existing farming records and research results

## Key Features Explained

### Live Research Engine
The application uses web scraping to gather real-time agricultural data from public sources, including:
- Crop suitability databases
- Weather information
- Soil analysis resources
- Irrigation best practices

### Multi-language Support
The application supports three languages:
- **English** - Default interface
- **Telugu** - తెలుగు interface for local farmers
- **Hindi** - हिंदी interface for Hindi-speaking users

### Security Features
- Password hashing with bcrypt
- Mobile number verification
- Session management with localStorage
- Input validation and sanitization

## Development Notes

### Database Schema
- **Farmers**: Name, mobile number, address, hashed password
- **Farming Records**: Farming type, soil type, water availability, area, fertility
- **Research Results**: Crop recommendations, irrigation processes, profit analysis, risk assessment

### Frontend Architecture
- Component-based React structure
- React Router for navigation
- Context API for state management
- Responsive design with Tailwind CSS

### Backend Architecture
- RESTful API design
- MongoDB with Mongoose ODM
- Error handling and logging
- CORS configuration for frontend communication

## Future Enhancements

### Planned Features
- Integration with real weather APIs
- Advanced crop prediction algorithms
- Mobile app development
- SMS notification system
- Farmer community features
- Marketplace integration

### Technical Improvements
- Real-time data streaming
- Advanced caching mechanisms
- Performance optimization
- Enhanced security measures
- Automated testing suite

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify firewall settings

2. **Frontend Not Loading**
   - Check if Vite development server is running
   - Verify port 5173 is available
   - Clear browser cache

3. **API Connection Issues**
   - Ensure backend server is running on port 5000
   - Check CORS configuration
   - Verify network connectivity

### Support
For technical support, contact: **8688484559**

## License
This project is proprietary software developed for agricultural advisory services.

---
*Built with ❤️ for farmers and sustainable agriculture*
=======
# Farming_consultant
This project is for Formers to get the suggestion of crops based on their facilities and availabilities. 
>>>>>>> d384e4c4ce13b6f34a0e08ce77e2162545bb7f38
