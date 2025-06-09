import React, { useEffect, useState, useRef } from 'react';
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
  channel: string;
}

const FrameworkItem: React.FC<FrameworkItemProps> = ({ 
  id, 
  name, 
  code, 
  categories, 
  status, 
  updatedAt, 
  channel 
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
          Channel: {channel} • {categories} categories • Last updated: {formatDate(updatedAt)}
          </p>
        </div>
        <div className="flex items-center mt-3 sm:mt-0">
          <Link to={`/frameworks/${id}`} className="mr-2">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowUpRight size={14} />}
              className="w-full"
            >
              View
            </Button>
          </Link>
          <Link to={`/frameworks/${id}/edit`} className="mr-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
            >
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FrameworksList: React.FC = () => {
  const { frameworks, loading, error, fetchFrameworks } = useFrameworksStore();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((!frameworks || frameworks.length === 0) && !loading && !error) {
      fetchFrameworks();
    }
    // eslint-disable-next-line
  }, []);

  // Close filter popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  // Get unique channel values for filter
  const channels = Array.from(new Set((frameworks || []).map((fw: any) => fw?.channel).filter(Boolean)));

  // Filter frameworks by search query (name or code) and selected channels
  const filteredFrameworks = (frameworks || []).filter((framework: any) => {
    if (!framework) return false;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      (framework.name?.toLowerCase().includes(q) ||
      framework.code?.toLowerCase().includes(q));
    const matchesChannel =
      selectedChannels.length === 0 || selectedChannels.includes(framework.channel);
    return matchesSearch && matchesChannel;
  });

  const handleChannelChange = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((ch) => ch !== channel)
        : [...prev, channel]
    );
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!frameworks) return <div className="text-center py-8">No frameworks data available.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Frameworks</h1>
          <p className="text-muted-foreground">
            Manage and create frameworks
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

      <div className="flex flex-col md:flex-row gap-4 items-center relative">
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
        <div ref={filterRef} className="relative">
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            aria-haspopup="true"
          >
            Filter
          </Button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-10 p-4 animate-fade-in">
              <div className="mb-2 font-semibold text-base">Filter by Channel</div>
              {channels.length === 0 ? (
                <div className="text-muted-foreground text-sm">No channels available</div>
              ) : (
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {channels.map((ch) => (
                    <label key={ch} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(ch)}
                        onChange={() => handleChannelChange(ch)}
                        className="accent-indigo-600"
                      />
                      <span className="text-sm">{ch}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Card className="animate-fade-in">
        {filteredFrameworks.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No frameworks found.</div>
        ) : (
          filteredFrameworks.map((framework: any) => (
            framework ? (
              <FrameworkItem
                key={framework.identifier}
                id={framework.identifier}
                name={framework.name}
                code={framework.code}
                categories={framework.categories ? framework.categories.length : 0}
                status={framework.status && framework.status.toLowerCase() === 'live' ? 'published' : 'draft'}
                updatedAt={framework.lastUpdatedOn ? new Date(framework.lastUpdatedOn) : new Date()}
                channel={framework.channel}
              />
            ) : null
          ))
        )}
      </Card>
    </div>
  );
};

export default FrameworksList;