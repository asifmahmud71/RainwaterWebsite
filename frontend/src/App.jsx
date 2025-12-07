import { useState } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FAQsPage from './components/FAQsPage';
import RegistrationPage from './components/RegistrationPage';
import AdminPage from './components/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      <NavBar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'faqs' && <FAQsPage />}
        {currentPage === 'registration' && <RegistrationPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      <footer className="bg-linear-to-r from-slate-800 to-slate-900 text-white py-12 mt-16 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">About Us</h3>
              <p className="text-gray-300 text-sm">Promoting sustainable water management and rainwater conservation worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Contact</h3>
              <p className="text-gray-300 text-sm">Email: info@rainwaterconvention.org</p>
              <p className="text-gray-300 text-sm">Phone: +880-2-XXXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="mb-2">© 2025 Rainwater Convention. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Powered by WaterAid Bangladesh • Promoting sustainable water management</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;