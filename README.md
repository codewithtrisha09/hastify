# 🪷 Hastify - Learn Bharatnatyam Mudras with AI

**Master Bharatnatyam Mudras with Real-time AI Detection and Feedback**

Hastify is a web-based application that helps you learn and practice Bharatnatyam mudras using your webcam. It uses MediaPipe hand detection and machine learning to recognize mudras in real-time and provide accuracy feedback.

## ✨ Features

### 📹 Live Mudra Detection
- Real-time webcam feed with hand detection
- Instant mudra identification
- Confidence scoring for accuracy assessment
- Support for 10+ Bharatnatyam mudras

### 📚 Mudra Reference Library
- Complete mudra database with descriptions
- Detailed finger positions and characteristics
- Usage meanings and representations
- Difficulty levels (Easy, Medium, Hard)
- Visual learning resources

### 🎯 Practice Mode
- Select target mudras to practice
- Real-time accuracy scoring
- Attempt history tracking
- Performance statistics and analytics
- Visual feedback on accuracy

### 📊 Performance Metrics
- Average accuracy tracking
- Best score tracking
- Attempt history (last 10)
- Accuracy distribution analysis
- Practice tips and guidance

### 🎨 Beautiful UI
- Yellowish-orange themed interface
- Responsive design (Desktop, Tablet, Mobile)
- Smooth animations and transitions
- Intuitive navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with webcam
- Good lighting environment

### Installation

1. **Clone or download the project**
```bash
cd hastify
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
hastify/
├── components/
│   ├── MudraDetector.jsx      # Main detection component
│   ├── MudraReference.jsx      # Mudra library component
│   └── PerformanceMetrics.jsx  # Statistics component
├── styles/
│   ├── MudraDetector.css       # Detector styles
│   ├── MudraReference.css      # Reference styles
│   └── PerformanceMetrics.css  # Metrics styles
├── utils/
│   ├── mudraDatabase.js        # Mudra definitions
│   └── mudraClassifier.js      # Hand recognition logic
├── App.jsx                     # Main application component
├── App.css                     # Main styles
├── main.jsx                    # React entry point
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🪷 Supported Mudras — All 28 Asamyuta Hastas

Pataka, Tripataka, Ardhapataka, Kartarimukha, Mayura, Ardhachandra, Araala, Shukatunda, Mushti, Shikhara, Kapitha, Katakamukha, Soochi, Chandrakala, Padmakosha, Sarpasirsha, Mrigasirsha, Simhamukha, Kangoola, Alapadma, Chatura, Bramara, Hamsasya, Hamsapaksha, Sandamsha, Mukula, Tamrachuda, and Trishoola — the complete set of single-hand gestures per the Abhinaya Darpana, with finger-position definitions, meanings, and difficulty ratings in `utils/mudraDatabase.js`.

## 🤖 ML Detection & Practice Recording

- **Weighted ML classification**: hand landmarks are normalized and scored against each mudra's finger-extension, curl, spread, and angle features (see `ML_GUIDE.md` for details)
- **Practice Mode**: pick any of the 28 mudras, see a live target-vs-detected comparison with correction suggestions
- **Session recording**: record your practice attempts as video, auto-saved in the browser, downloadable as `.webm`
- **Search & filter**: find a mudra by name or English meaning in the Reference library, then jump straight into practicing it


## 🎯 How to Use

### Live Detector Mode
1. Navigate to "📹 Live Detector" tab
2. Allow camera access when prompted
3. Position your hand clearly in the camera frame
4. Make a mudra with your hand
5. The app will detect and display the mudra name and confidence level

### Mudra Reference
1. Navigate to "📚 Mudra Reference" tab
2. Browse the mudra library
3. Filter by difficulty (Easy, Medium, Hard)
4. Click on any mudra to see detailed information
5. Learn finger positions and meanings

### Practice Mode
1. Navigate to "🎯 Practice Mode" tab
2. Select a mudra to practice from the dropdown
3. Position your hand and form the selected mudra
4. Get real-time accuracy feedback (0-100%)
5. View your practice statistics and attempts

## 🔧 Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Hand Detection**: MediaPipe Hands
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useRef, useEffect)

## 📊 How It Works

### Hand Detection
The app uses MediaPipe's pre-trained hand detection model to:
1. Detect hands in the webcam feed
2. Extract 21 hand landmarks (joints)
3. Track finger positions and movements
4. Calculate distances and angles

### Mudra Classification
The classifier analyzes hand features:
1. **Finger Extension**: Whether fingers are extended or bent
2. **Finger Spread**: Distance between fingers
3. **Hand Shape**: Overall hand configuration
4. **Confidence Scoring**: Probability of mudra match

### Accuracy Calculation
In practice mode:
- Matches target mudra features with detected mudra
- Scores accuracy based on feature similarity
- Provides real-time feedback (0-100%)

## 🎨 Customization

### Add New Mudras
Edit `utils/mudraDatabase.js`:

```javascript
{
  id: 11,
  name: "YourMudraName",
  englishName: "English Name",
  meaning: "Meaning description",
  description: "Detailed description",
  fingers: "Finger position description",
  visualCharacteristic: "What it looks like",
  features: {
    index_extended: true,
    middle_extended: true,
    // ... other features
  },
  usedFor: ["Meaning1", "Meaning2"],
  imageUrl: "/mudras/yourname.png",
  difficulty: "Easy"
}
```

### Change Theme Colors
Edit `:root` variables in `App.css`:

```css
:root {
  --primary-orange: #your-color;
  --primary-yellow: #your-color;
  /* ... other colors ... */
}
```

## 📱 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari (with limitations)
- Edge
- Mobile browsers (with webcam support)

## ⚙️ System Requirements

- **Processor**: Dual-core 2.0 GHz or better
- **RAM**: 2GB minimum, 4GB recommended
- **Webcam**: USB or built-in webcam
- **Internet**: Required for MediaPipe models
- **Lighting**: Well-lit environment for best results

## 🔐 Privacy

- **No Data Stored**: All processing happens locally
- **No Server Upload**: Your webcam feed never leaves your device
- **No Analytics**: No usage tracking or analytics
- **Permission Required**: App requires webcam permission to function

## 🐛 Troubleshooting

### Camera Not Working
- Check browser camera permissions
- Try a different browser
- Ensure camera is not in use by another app
- Check camera LED indicator

### Low Detection Accuracy
- Improve lighting conditions
- Position hand more centrally
- Ensure good contrast between hand and background
- Move hand slowly and deliberately

### Mudra Not Detected
- Make the mudra more clearly
- Ensure all fingers are visible
- Check that your hand is well-lit
- Try a different mudra first

### Performance Issues
- Close other browser tabs
- Reduce screen resolution
- Enable hardware acceleration in browser
- Check browser console for errors

## 📝 Tips for Better Learning

1. **Start with Easy Mudras**: Pataka, Tripataka, Ardhapataka
2. **Practice in Good Light**: Use natural light or bright lamps
3. **Use Mirrors**: Practice with a mirror for visual feedback
4. **Slow Practice**: Move slowly and deliberately
5. **Repeat**: Practice each mudra 10-15 times
6. **Progress Gradually**: Move to harder mudras after mastering easy ones
7. **Watch Videos**: Study reference videos while practicing
8. **Record Yourself**: Record practice sessions to review

## 📚 Learning Resources

### External Resources
- [Bharatnatyam Dance](https://en.wikipedia.org/wiki/Bharatanatyam)
- [Mudra Reference Books](https://www.natyadarpan.in/)
- [Video Tutorials](https://www.youtube.com/results?search_query=bharatnatyam+mudras)

### In-App Resources
- Mudra Reference Library
- Detailed finger position guides
- Meaning and usage information

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Add more mudras to the database
- Improve classification accuracy
- Add mudra combinations
- Add video tutorials
- Improve UI/UX
- Add more languages

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Developer Notes

### Adding Features

**To add new components:**
1. Create file in `components/` folder
2. Create corresponding CSS in `styles/` folder
3. Import and use in App.jsx

**To modify mudra features:**
1. Edit `mudraClassifier.js` feature extraction
2. Update feature thresholds
3. Test with different hand positions

**To improve accuracy:**
1. Increase MediaPipe confidence thresholds
2. Add more feature checks
3. Implement machine learning model training

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section
2. Check browser console for errors
3. Ensure all permissions are granted
4. Try a different browser
5. Clear browser cache and cookies

## 🎓 Educational Use

This application is designed for:
- **Students**: Learning Bharatnatyam mudras
- **Teachers**: Evaluating student mudras
- **Enthusiasts**: Practicing at home
- **Researchers**: Studying hand recognition

## 🌟 Acknowledgments

- MediaPipe for hand detection models
- React community for amazing tools
- Bharatnatyam dance tradition and culture

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Developed with ❤️ for Bharatnatyam learners**

🪷 **Happy Learning!** 🪷