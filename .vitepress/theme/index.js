
import DefaultTheme from 'vitepress/theme'
import Feedback from './components/Feedback.vue' // Import the file for feedback widget
import ZoomableImage from './components/ZoomableImage.vue' // Click-to-zoom wrapper for doc screenshots
import Layout from './Layout.vue' // Import new layout file
import './custom.css'



export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Feedback', Feedback)
    // Guarded: enhanceApp can run more than once (HMR, extra render passes),
    // and re-registering warns.
    if (!app.component('ZoomableImage')) {
      app.component('ZoomableImage', ZoomableImage)
    }
  }
}
