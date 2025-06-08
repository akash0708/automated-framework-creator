import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Badge from './Badge';

interface Term {
  identifier: string;
  name: string;
}

interface Category {
  name: string;
  identifier: string;
  terms: Term[];
}

interface AssociationCategoriesProps {
  categories: Category[];
}

const AssociationCategories: React.FC<AssociationCategoriesProps> = ({ categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleShowMore = () => {
    setShowModal(true);
    setExpandedCategory(null);
  };

  const handleBadgeClick = (id: string) => {
    setShowModal(true);
    setExpandedCategory(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExpandedCategory(null);
  };

  const handleCategoryClick = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const visibleCategories = categories.slice(0, 4);
  const hasMore = categories.length > 4;

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {visibleCategories.map(cat => (
          <span
            key={cat.identifier}
            className="cursor-pointer relative group"
            onClick={() => handleBadgeClick(cat.identifier)}
          >
            <Badge className="bg-indigo-100 text-indigo-800">
              {cat.name}
            </Badge>
            <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-10 hidden group-hover:block bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
              Click to expand
            </div>
          </span>
        ))}
        {hasMore && (
          <Button size="sm" variant="outline" onClick={handleShowMore} className="ml-1 px-2 py-0.5 text-xs">Show More</Button>
        )}
      </div>
      <Modal open={showModal} onClose={handleCloseModal} title="All Categories">
        <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat.identifier}>
              <button
                className="w-full text-left font-medium py-2 px-2 rounded hover:bg-slate-100 focus:outline-none focus:bg-slate-200 flex items-center justify-between"
                onClick={() => handleCategoryClick(cat.identifier)}
              >
                <span>{cat.name}</span>
                <span
                  className={`transition-transform ml-2 inline-block ${expandedCategory === cat.identifier ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L10 12L14 8" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {expandedCategory === cat.identifier && (
                <div className="pl-4 py-1">
                  {cat.terms && cat.terms.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {cat.terms.map(term => (
                        <li key={term.identifier} className="py-0.5">{term.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-slate-500 text-sm">No terms</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AssociationCategories; 