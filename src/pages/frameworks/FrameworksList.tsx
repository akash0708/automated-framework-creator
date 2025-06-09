import React, { useEffect, useState } from 'react';
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
import { useFrameworksStore } from '../../store/frameworksStore';

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
          >
            <Link to={`/frameworks/${id}`}>
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
          >
            <Link to={`/frameworks/${id}/edit`}>
              Edit
            </Link>  
          </Button>
        </div>
      </div>
    </div>
  );
};

const FrameworksList: React.FC = () => {
  const { frameworks, loading, error, fetchFrameworks } = useFrameworksStore();
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('');

  useEffect(() => {
    if (frameworks.length === 0 && !loading && !error) {
      fetchFrameworks();
    }
    // eslint-disable-next-line
  }, []);

  // Get unique channel values for filter dropdown
  const channels = Array.from(new Set(frameworks.map((fw: any) => fw.channel).filter(Boolean)));

  // Filter frameworks by search query (name or code) and channel
  const filteredFrameworks = frameworks.filter((framework: any) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      framework.name?.toLowerCase().includes(q) ||
      framework.code?.toLowerCase().includes(q);
    const matchesChannel = channelFilter ? framework.channel === channelFilter : true;
    return matchesSearch && matchesChannel;
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

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
        >
          <Link to="/frameworks/create">
            Create Framework
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search frameworks..."
            className="py-2 pl-10 pr-4 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <select
            className="py-2 px-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
          >
            <option value="">All Channels</option>
            {channels.map((ch) => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>
        <Button
          variant="outline"
          leftIcon={<Filter size={16} />}
          disabled
        >
          Filter
        </Button>
      </div>

      <Card className="animate-fade-in">
        {filteredFrameworks.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No frameworks found.</div>
        ) : (
          filteredFrameworks.map((framework: any) => (
            <FrameworkItem
              key={framework.identifier}
              id={framework.identifier}
              name={framework.name}
              code={framework.code}
              categories={framework.categories ? framework.categories.length : 0}
              status={framework.status && framework.status.toLowerCase() === 'live' ? 'published' : 'draft'}
              updatedAt={framework.lastUpdatedOn ? new Date(framework.lastUpdatedOn) : new Date()}
            />
          ))
        )}
      </Card>
    </div>
  );
};

export default FrameworksList;