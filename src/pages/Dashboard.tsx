import React from 'react';
import { 
  Layers, 
  Users, 
  FileText,
  ArrowRight, 
  ArrowUpRight,
  BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <Card className="animate-fade-in">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          {trend && (
            <div className="flex items-center mt-1">
              <span className={trend.positive ? 'text-green-600' : 'text-red-600'}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivityItem: React.FC<{
  title: string;
  time: string;
  status: string;
  user: string;
}> = ({ title, time, status, user }) => (
  <div className="py-3 border-b border-border last:border-0">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {user} • {time}
        </p>
      </div>
      <Badge 
        variant={status === 'Published' ? 'success' : status === 'Draft' ? 'secondary' : 'default'}
      >
        {status}
      </Badge>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your admin portal</p>
        </div>
        <Button
          rightIcon={<ArrowRight size={16} />}
          as={Link}
          to="/frameworks/create"
        >
          Create Framework
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Frameworks"
          value="15"
          icon={<Layers className="h-5 w-5 text-indigo-600" />}
          trend={{ value: "12.5%", positive: true }}
        />
        <StatCard
          title="Total Categories"
          value="48"
          icon={<FileText className="h-5 w-5 text-indigo-600" />}
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard
          title="Active Users"
          value="1,023"
          icon={<Users className="h-5 w-5 text-indigo-600" />}
          trend={{ value: "4.1%", positive: true }}
        />
        <StatCard
          title="API Calls (24h)"
          value="13.5k"
          icon={<BarChart className="h-5 w-5 text-indigo-600" />}
          trend={{ value: "2.3%", positive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <RecentActivityItem
                title="Mathematics Framework"
                time="2 hours ago"
                status="Published"
                user="Admin User"
              />
              <RecentActivityItem
                title="Science Framework"
                time="5 hours ago"
                status="Draft"
                user="Content Manager"
              />
              <RecentActivityItem
                title="Language Framework"
                time="Yesterday"
                status="Published"
                user="Admin User"
              />
              <RecentActivityItem
                title="Social Studies Framework"
                time="2 days ago"
                status="Published"
                user="Content Manager"
              />
              <RecentActivityItem
                title="Computer Science Framework"
                time="3 days ago"
                status="Draft"
                user="Admin User"
              />
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              as={Link}
              to="/frameworks"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Frameworks
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                className="w-full justify-between mb-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                variant="outline"
                rightIcon={<ArrowUpRight size={16} />}
                as={Link}
                to="/frameworks/create"
              >
                Create New Framework
              </Button>
              <Button
                className="w-full justify-between mb-2"
                variant="outline"
                rightIcon={<ArrowUpRight size={16} />}
                as={Link}
                to="/frameworks"
              >
                Manage Frameworks
              </Button>
              <Button
                className="w-full justify-between mb-2"
                variant="outline"
                rightIcon={<ArrowUpRight size={16} />}
                as={Link}
                to="/users"
              >
                User Management
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                rightIcon={<ArrowUpRight size={16} />}
                as={Link}
                to="/settings"
              >
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;