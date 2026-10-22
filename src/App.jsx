import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import MainContent from './components/MainContent.jsx';

// App composes the four main page regions into one React application.
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <MainContent />
      <Footer />
    </>
  );
}