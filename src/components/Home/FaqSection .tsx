import { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
}

const FaqSection = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: 1,
      question: 'What services do you offer?',
      answer: 'Provide an overview of the specific IT services your company offers, such as software development, web development, IT consulting, cybersecurity, etc.',
      isActive: true
    },
    {
      id: 2,
      question: 'What industries do you specialize in?',
      answer: 'Outline the industries your company has expertise in, whether it\'s healthcare, finance, e-commerce, etc.',
      isActive: false
    },
    {
      id: 3,
      question: 'Can you explain your development process?',
      answer: 'Describe the methodology or processes your company follows in software or product development.',
      isActive: false
    },
    {
      id: 4,
      question: 'What technologies do you work with?',
      answer: 'List the programming languages, frameworks, and technologies your company is proficient in.',
      isActive: false
    },
    {
      id: 5,
      question: 'How do you ensure the security of our data?',
      answer: 'Explain the security measures your company has in place to protect client data and sensitive information.',
      isActive: false
    },
    {
      id: 6,
      question: 'How do you handle project management?',
      answer: 'Explain your approach to project management, including communication channels, milestones, and client involvement.',
      isActive: false
    },
    {
      id: 7,
      question: 'What is your pricing model?',
      answer: 'Clarify how your company structures its pricing—whether it\'s hourly rates, project-based, or a retainer model.',
      isActive: false
    },
    {
      id: 8,
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Explain your post-launch support and maintenance services, including any service-level agreements (SLAs).',
      isActive: false
    },
    {
      id: 9,
      question: 'Can you provide references or case studies?',
      answer: 'Share success stories, case studies, or references from previous clients to build trust and showcase your company\'s capabilities.',
      isActive: false
    },
    {
      id: 10,
      question: 'What is your approach to handling changes in project scope?',
      answer: 'Discuss how your company manages changes in project scope, including any associated costs or timeline adjustments.',
      isActive: false
    },
    {
      id: 11,
      question: 'How can we contact your support team?',
      answer: 'Provide contact information and details on how clients can reach your support team for assistance.',
      isActive: false
    },
    {
      id: 12,
      question: 'What is your disaster recovery plan?',
      answer: 'Briefly describe the measures in place to ensure business continuity and data recovery in the event of a disaster.',
      isActive: false
    },
    {
      id: 13,
      question: 'Are you open to collaboration or partnerships?',
      answer: 'Indicate whether your company is open to collaboration, joint ventures, or partnerships with other businesses.',
      isActive: false
    }
  ]);

  const toggleFaq = (id: number) => {
    setFaqs(faqs.map(faq => ({
      ...faq,
      isActive: faq.id === id ? !faq.isActive : false
    })));
  };

  const sideImages = [
    { src: './home/side5.png', alt: 'side-view' },
    { src: './home/side6.png', alt: 'side-view' },
    { src: './home/side7.png', alt: 'side-view' }
  ];

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4" data-aos="fade-up" data-aos-delay="100">
            <div className="px-0 lg:px-12">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-gray-600">Frequently Asked </span>
                <strong className="text-primary">Questions</strong>
              </h3>
              <p className="text-gray-500 mb-8">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit */}
              </p>

              <div className="space-y-12">
                {sideImages.map((image, index) => (
                  <div key={index} className="mt-12 first:mt-0">
                    <img src={image.src} className="w-full" alt={image.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4" data-aos="fade-up" data-aos-delay="200">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`border border-gray-200 rounded-lg p-6 transition-all duration-300 ${faq.isActive ? 'bg-gray-50' : ''}`}
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h3 className="text-lg font-semibold">
                      <span className="text-primary mr-2">{faq.id}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <i className={`fas fa-chevron-${faq.isActive ? 'down' : 'right'} text-primary`}></i>
                  </div>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${faq.isActive ? 'max-h-96 mt-4' : 'max-h-0'}`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;