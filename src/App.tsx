import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import PageLoader from './components/Layout/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/Blogs/BlogPost';
import BlogPost1 from './pages/Blogs/BlogPost1';
import BlogPost2 from './pages/Blogs/BlogPost2';
import BlogAdmin from './pages/BlogAdmin';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CareerTable from './components/CareerTable';
import ContactTable from './components/ContactTable';
import SubscriberTable from './components/SubscriberTable';
import Portfolio from './components/Portfolio/Portfolio';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="font-inter">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="portfolio" element={<Portfolio />} />
              </Route>
              <Route path="contact-table" element={<ContactTable />} />
              <Route path="career-table" element={<CareerTable />} />
              <Route path="subscriber-table" element={<SubscriberTable />} />
              <Route path="blog-admin" element={<BlogAdmin />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;