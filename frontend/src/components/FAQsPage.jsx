import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQsPage() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const faqs = [
    {
      question: 'What is rainwater harvesting?',
      answer: 'Rainwater harvesting is the collection and storage of rain for reuse before it reaches the aquifer. It can be used for irrigation, water supply, and groundwater recharge.'
    },
    {
      question: 'Why should we conserve rainwater?',
      answer: 'Rainwater conservation reduces dependency on groundwater, decreases water scarcity, lowers water bills, and promotes environmental sustainability.'
    },
    {
      question: 'Who can participate in the convention?',
      answer: 'Anyone interested in water management, sustainability professionals, NGO workers, government officials, students, and community leaders are welcome.'
    },
    {
      question: 'What are the registration fees?',
      answer: 'Registration is FREE for all participants. We believe in making sustainability accessible to everyone.'
    },
    {
      question: 'What certification will I receive?',
      answer: 'Participants will receive a digital certificate of participation upon completion of the convention.'
    },
    {
      question: 'Is there accommodation provided?',
      answer: 'We provide a list of nearby hotels and accommodations. Participants are responsible for their own arrangements.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg">Find answers to common questions about the Rainwater Convention</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-lg font-semibold text-gray-800 text-left">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-blue-600 transition-transform ${
                  expandedIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedIdx === idx && (
              <div className="px-6 pb-4 pt-0 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQsPage;