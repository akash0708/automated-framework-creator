import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Plus, 
  Search, 
  Filter 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../lib/utils';

interface FrameworkItemProps {
  id: string;
  name: string;
  code: string;
  categories: number;
  status: 'draft' | 'published';
  updatedAt: Date;
}

const FrameworkItem: React.FC<FrameworkItemProps> = ({ 
  id, 
  name, 
  code, 
  categories, 
  status, 
  updatedAt 
}) => {
  return (
    <div className="p-4 border-b border-border last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-lg">{name}</h3>
            <Badge
              variant={status === 'published' ? 'success' : 'secondary'}
              className="ml-3"
            >
              {status === 'published' ? 'Published' : 'Draft'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Code: {code} • {categories} categories • Last updated: {formatDate(updatedAt)}
          </p>
        </div>
        <div className="flex items-center mt-3 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            rightIcon={<ArrowUpRight size={14} />}
            as={Link}
            to={`/frameworks/${id}`}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            as={Link}
            to={`/frameworks/${id}/edit`}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

const FrameworksList: React.FC = () => {
  // Sample data - in a real app this would come from an API
  const frameworks = [
    { 
      id: '1', 
      name: 'Mathematics Framework', 
      code: 'math_framework', 
      categories: 5, 
      status: 'published' as const, 
      updatedAt: new Date(2025, 3, 15) 
    },
    { 
      id: '2', 
      name: 'Science Framework', 
      code: 'science_framework', 
      categories: 8, 
      status: 'published' as const, 
      updatedAt: new Date(2025, 3, 10) 
    },
    { 
      id: '3', 
      name: 'Language Framework', 
      code: 'language_framework', 
      categories: 4, 
      status: 'published' as const, 
      updatedAt: new Date(2025, 3, 5) 
    },
    { 
      id: '4', 
      name: 'Computer Science Framework', 
      code: 'cs_framework', 
      categories: 6, 
      status: 'draft' as const, 
      updatedAt: new Date(2025, 2, 28) 
    },
    { 
      id: '5', 
      name: 'Social Studies Framework', 
      code: 'social_framework', 
      categories: 7, 
      status: 'published' as const, 
      updatedAt: new Date(2025, 2, 20) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Frameworks</h1>
          <p className="text-muted-foreground">
            Manage and create educational frameworks
          </p>
        </div>
        <Button
          leftIcon={<Plus size={16} />}
          as={Link}
          to="/frameworks/create"
        >
          Create Framework
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search frameworks..."
            className="py-2 pl-10 pr-4 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
        </div>
        <Button
          variant="outline"
          leftIcon={<Filter size={16} />}
        >
          Filter
        </Button>
      </div>

      <Card className="animate-fade-in">
        {frameworks.map(framework => (
          <FrameworkItem
            key={framework.id}
            id={framework.id}
            name={framework.name}
            code={framework.code}
            categories={framework.categories}
            status={framework.status}
            updatedAt={framework.updatedAt}
          />
        ))}
      </Card>
    </div>
  );
};

export default FrameworksList;