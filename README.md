# 🏡 EstateEase – Real Estate Mobile App

**EstateEase** is a feature-rich, modern real estate listing mobile application built using **Expo**, **React Native**, **NativeWind**, and **Zustand** for state management. This app allows users to browse, filter, and explore property listings with a sleek user experience, as well as contact agents, manage favorites, and edit profile settings.

---

## 📱 Demo
 
[📥 Download APK (via EAS Build)](#)
https://expo.dev/accounts/ayushchhanchar/projects/EstateEase2/builds/6e13f682-fdd1-4577-85ac-63e7f10b3efe

---

## 🚀 Features

- 🔍 **Property Search** – Search by location, city, or zip code.
- 🏷️ **Filter by Type & Category** – Filter by rent/buy, category (apartment, villa, house, etc.), city, price range, and more.
- 🛏️ **View Property Details** – Tap any property to see detailed specs, images, description, agent info, and facilities.
- ❤️ **Favorites Management** – Like and unlike properties, which persist across the session.
- 👤 **Profile Screen** – View and edit profile with image upload support.
- 📨 **Contact Agent** – Contact property agents directly via a modern form.
- 🌙 **Dark Mode (Optional)** – Toggleable UI theme for better accessibility (if enabled).
- 💾 **Global State Management** – Clean and efficient global state via Zustand.
- 🎨 **Tailwind-style Styling** – Rapid UI development using NativeWind.

---

## 📸 Screenshots

| Home | Property Details | Filters | Contact Agent | Profile |
|------|------------------|---------|----------------|---------|
| ![home](./assets/screens/home.png) | ![details](./assets/screens/details.png) | ![filters](./assets/screens/filters.png) | ![contact](./assets/screens/contact.png) | ![profile](./assets/screens/profile.png) |

---

## 🛠️ Tech Stack

| Tool               | Purpose                              |
|--------------------|--------------------------------------|
| Expo (Router)      | Project bootstrapping & navigation   |
| React Native       | Core mobile development              |
| NativeWind         | Tailwind-style styling in RN         |
| Zustand            | Global state management              |
| Expo Image Picker  | Profile image selection              |
| Ionicons           | Iconography                          |
| EAS Build          | For APK deployment (Android)         |

---

## 📂 Project Structure

├── app/
│ ├── tabs/ # Tab screens (Home, Favorites, Messages, Profile)
│ ├── modals/ # Modal routes (Details, Contact)
│ ├── filters.tsx # Full filter screen
├── components/ # Reusable UI components like PropertyCard
├── constants/ # Dummy property data, constants
├── store/ # Zustand state (filters, profile, favorites)
├── assets/ # Images and fonts
├── README.md

yaml
Copy
Edit

---

## ⚙️ Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/estateease.git
cd estateease

# 2. Install dependencies
npm install

# 3. Start the Expo server
npx expo start
📦 Build APK (via EAS)
To generate an Android APK:

bash
Copy
Edit
npx eas build --platform android
You can then distribute the APK to testers or upload it to the Play Store.

🌐 Web Compatibility
Basic web support is possible with:

bash
Copy
Edit
npm install react-dom react-native-web
npm run web
Note: Web version may not fully replicate the mobile experience.

✍️ Author
Ayush Chhanchar
Frontend & Mobile Developer
📧 ayush@example.com
🔗 LinkedIn | Portfolio

