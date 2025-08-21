import { useState } from 'react';
import { useNavigate } from 'react-router';
import PageLayout from '@/components/layout/PageLayout';
import BackIcon from '@/components/icons/BackIcon';
import NameInput from '@/components/form/BasicInformation/NameInput/NameInput';
import WeddingDateInput from '@/components/form/BasicInformation/WeddingDateInput/WeddingDateInput';
import AddressInput from '@/components/form/BasicInformation/AddressInput/AddressInput';
import { Check, ChevronRight } from 'lucide-react';

const BasicInformationPage = () => {
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 2, 3]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const sections = [
    {
      id: 1,
      title: '신랑 / 신부 이름',
      isRequired: true,
      isCompleted: true,
      content: <NameInput />,
    },
    {
      id: 2,
      title: '예식 일시',
      isRequired: true,
      isCompleted: true,
      content: <WeddingDateInput />,
    },
    {
      id: 3,
      title: '예식 장소',
      isRequired: true,
      isCompleted: true,
      content: <AddressInput />,
    },
  ];

  return (
    <div>
      <PageLayout
        title="기본 정보 관리"
        leftButton={
          <button onClick={() => navigate(-1)} aria-label="뒤로가기">
            <BackIcon />
          </button>
        }
        rightButton={
          <button className="flex items-center text-sm rounded-md text-slate-800 p-2 mx-2 hover:bg-white/30 transition-colors">
            저장
          </button>
        }
      >
        <div className="flex flex-col w-full h-content overflow-auto p-8">
          <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto">
            {sections.map((section) => {
              const isExpanded = expandedIds.includes(section.id);
              return (
                <div key={section.id} className="glass-card overflow-hidden">
                  <div
                    className={`w-full px-4 py-5 cursor-pointer ${
                      !section.isRequired && 'pl-11'
                    }`}
                    onClick={() => toggleExpand(section.id)}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`accordion-content-${section.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {section.isRequired && (
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              section.isCompleted
                                ? 'bg-gradient-to-br from-[#ff90ba] to-[#a7c7ff] backdrop-blur-sm shadow-sm'
                                : 'bg-slate-900/10 backdrop-blur-sm'
                            }`}
                          >
                            {section.isCompleted ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-slate-900/15 rounded-full" />
                            )}
                          </div>
                        )}
                        <h3 className="font-medium text-slate-800 text-sm">
                          {section.title}
                        </h3>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      id={`accordion-content-${section.id}`}
                      className="pt-2"
                    >
                      <div className="bg-white/20 backdrop-blur-xl rounded-b-xl py-6 px-6">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default BasicInformationPage;
