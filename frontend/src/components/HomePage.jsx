import { useState, useEffect } from 'react';
import { Droplets, Leaf, Users, Award } from 'lucide-react';

function HomePage({ setCurrentPage }) {
  const [totalRegistrations, setTotalRegistrations] = useState(null);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      try {
        const res = await fetch(process.env.API_URL+"/registrations");
        const json = await res.json();
        if (!mounted) return;
        if (json && json.success && Array.isArray(json.data)) {
          setTotalRegistrations(json.data.length);
        } else {
          setStatsError('Unable to load stats');
        }
      } catch (err) {
        if (!mounted) return;
        setStatsError('Network error');
      }
    };

    fetchCount();
    return () => { mounted = false; };
  }, []);

  const features = [
    {
      icon: <Droplets className="w-12 h-12 text-blue-600" />,
      title: 'Water Conservation',
      description: 'Learn sustainable rainwater harvesting techniques for your community'
    },
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: 'Eco-Friendly',
      description: 'Reduce environmental impact with renewable water resources'
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: 'Community Focused',
      description: 'Join thousands of professionals dedicated to water sustainability'
    },
    {
      icon: <Award className="w-12 h-12 text-yellow-600" />,
      title: 'Expert Knowledge',
      description: 'Access insights from leading water management specialists'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-blue-500 to-green-500 p-12 md:p-20 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to the Rainwater Convention 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Join us in revolutionizing water management through sustainable rainwater harvesting and conservation practices.
          </p>
          <button
            onClick={() => setCurrentPage && setCurrentPage('registration')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Why Join Us?</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Discover the benefits of sustainable water management</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-200 border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-blue-400 mb-2">
              {totalRegistrations !== null ? `${totalRegistrations}+` : (statsError ? '—' : '...')}
            </div>
            <p className="text-gray-300 text-lg">Participants Worldwide</p>
            {statsError && <p className="text-sm text-yellow-200 mt-2">{statsError}</p>}
          </div>
          <div>
            <div className="text-5xl font-bold text-green-400 mb-2">50+</div>
            <p className="text-gray-300 text-lg">Countries Represented</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-yellow-400 mb-2">100%</div>
            <p className="text-gray-300 text-lg">Sustainable Impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;