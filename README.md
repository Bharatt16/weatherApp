# Breeze Weather App 🌤️

A modern, dynamic weather application that provides real-time weather information with beautiful visual backgrounds that change based on current weather conditions.

## 🌟 Features

### Current Implementation
- **Real-time Weather Data**: Fetches current weather information using the Visual Crossing Weather API
- **5-Day Forecast**: Displays weather predictions for the next 5 days
- **Dynamic Backgrounds**: Automatically changes background images based on weather conditions (clear, cloudy, rainy, snowy, windy)
- **Weather Details**: Shows comprehensive weather information including:
  - Current temperature
  - Weather description
  - Feels like temperature
  - Humidity percentage
  - Wind speed
  - Cloud cover percentage
- **Weather Icons**: Dynamic weather icons that update based on current conditions
- **Location Search**: Search for weather by any city or location
- **Loading States**: Smooth loading animations during data fetching
- **Custom Typography**: Norse Bold custom font for enhanced visual appeal

### Technical Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build Tool**: Webpack 5 with development server
- **Styling**: CSS with backdrop filters and modern design patterns
- **API**: Visual Crossing Weather Services
- **Assets**: Custom weather icons and background images

## 🚧 Work in Progress

This project is currently under development. The following features are **not yet implemented**:

### Missing Features
1. **Temperature Unit Conversion**: 
   - Celsius to Fahrenheit conversion functionality is coded but not fully integrated
   - Temperature toggle dropdown exists but needs proper implementation

2. **Mobile Responsive Design**:
   - Current layout is optimized for desktop only
   - Mobile and tablet breakpoints need to be implemented
   - Touch-friendly interface adjustments required
   - Responsive grid system for forecast cards

## 🎨 Design Features

- **Glassmorphism Effects**: Modern backdrop blur effects on weather cards
- **Dynamic Theming**: Background changes based on weather conditions:
  - Clear Day/Night → Clear sky backgrounds
  - Cloudy → Cloud formations
  - Rainy → Rain scenes
  - Snowy → Winter landscapes
  - Windy → Dynamic wind scenes
- **Smooth Transitions**: CSS animations for background changes and loading states
- **Custom Icons**: Dedicated weather condition icons

## 🛠️ Project Structure

```
weatherApp/
├── src/
│   ├── index.js          # Main application logic
│   ├── template.html     # HTML template
│   ├── styles.css        # CSS styling
│   └── animation.js      # Animation utilities
├── public/utilities/     # Static assets
│   ├── *.png            # Weather icons
│   ├── *.jpg/*.jpeg     # Background images  
│   ├── *.svg            # UI icons
│   └── fonts/           # Custom fonts
├── webpack.config.js     # Webpack configuration
└── package.json         # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- Internet connection for weather API calls

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npx webpack serve
   ```

## 🔧 Development Status

### Completed ✅
- Core weather data fetching
- Weather display components
- Dynamic background system
- Weather icons integration
- Loading states
- Basic error handling
- 5-day forecast display

### In Progress 🏗️
- Temperature unit conversion system
- Mobile responsive design

### Planned 📋
- Enhanced error handling and user feedback
- Weather data caching
- Location geolocation support
- Weather alerts and notifications
- Enhanced accessibility features
- Performance optimizations

## 🌡️ API Integration

The app uses the Visual Crossing Weather API to fetch:
- Current weather conditions
- 5-day weather forecast
- Weather icons and descriptions
- Detailed meteorological data

## 🎯 Future Enhancements

Once the core missing features are implemented, planned enhancements include:
- Hourly weather forecasts
- Weather maps integration
- User location detection
- Favorite locations
- Weather notifications
- Offline functionality
- PWA capabilities

---

**Note**: This is an active development project. The temperature conversion and mobile responsiveness features are the primary focus for the next development phase.