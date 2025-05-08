# 🏌️‍♂️ Motion challenges

An interactive landing page for a golf event, featuring animations, a slider, and a dynamic countdown timer. Built with
**Next.js**, **Framer Motion**, **Tailwind CSS**, and modern React components.

## 🚀 Features

- 🎞️ **Slider** with text and images, controlled by buttons and drag gestures
- ⏳ **Live countdown** to the event date
- 🌀 **Golf ball animation** triggered on scroll
- 🧠 **Entrance animations** based on viewport visibility (`useInView`)
- 📱 **Responsive layout** for mobile and desktop

---

## 🧰 Technologies

- **Next.js**
- **React**
- **Motion**
- **Tailwind CSS**
- **TypeScript**

---

## 📂 Project Structure

```
/components
  ├─ ball-animation.tsx
  ├─ countdown-timer.tsx
  ├─ slider.tsx
  └─ vertical-slider-nav.tsx

/data
  └─ data-slides.ts
  
/types
  ├─ countdown-timer.tsx
  └─ slider.tsx
  
/utils
  └─ utils.ts
```

---

## 🧪 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser

---

## ⚙️ Configuration

- Event date is configured in `CountdownTimer.tsx`:
  ```ts
  const targetDate = new Date("2025-09-22T00:00:00");
  ```
- Slide content is editable in `data-slides.ts`

---