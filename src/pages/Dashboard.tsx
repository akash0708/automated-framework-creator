"use client";

import React, { useEffect } from "react";
import { Layers, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useFrameworksStore } from "@/store/frameworksStore";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card className="animate-fade-in">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivityItem: React.FC<{
  title: string;
  time: string;
  status: string;
  user: string;
  id?: string;
}> = ({ title, time, status, user, id }) => (
  <div className="py-3 border-b border-border last:border-0">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">
          {id ? (
            <Link
              href={`/frameworks/${id}`}
              className="hover:underline text-black"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {user} • {time}
        </p>
      </div>
      <Badge
        variant={
          status === "Published"
            ? "success"
            : status === "Draft"
            ? "secondary"
            : "default"
        }
      >
        {status}
      </Badge>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { frameworks, loading, error, fetchFrameworks } = useFrameworksStore();

  useEffect(() => {
    if (frameworks.length === 0 && !loading && !error) {
      fetchFrameworks();
    }
    // eslint-disable-next-line
  }, []);

  // Sort frameworks by lastUpdatedOn (descending)
  const sortedFrameworks = [...frameworks].sort((a, b) => {
    const dateA = a.lastUpdatedOn ? new Date(a.lastUpdatedOn).getTime() : 0;
    const dateB = b.lastUpdatedOn ? new Date(b.lastUpdatedOn).getTime() : 0;
    return dateB - dateA;
  });

  // Show up to 5 most recent
  const recentFrameworks = sortedFrameworks.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Link href="/frameworks/create">
          <Button rightIcon={<ArrowRight size={16} />}>Create Framework</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Frameworks"
          value={frameworks.length.toString()}
          icon={<Layers className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Master Categories"
          value="12"
          icon={<Layers className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Total Categories"
          value="48"
          icon={<FileText className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Terms"
          value="320"
          icon={<FileText className="h-5 w-5 text-indigo-600" />}
        />
      </div>

      <div className="grid gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">{error}</div>
            ) : recentFrameworks.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No recent activity.
              </div>
            ) : (
              <div className="space-y-0">
                {recentFrameworks.map((fw) => (
                  <RecentActivityItem
                    key={fw.identifier}
                    id={fw.identifier}
                    title={fw.name}
                    time={
                      fw.lastUpdatedOn
                        ? new Date(fw.lastUpdatedOn).toLocaleString()
                        : "Unknown"
                    }
                    status={
                      fw.status && fw.status.toLowerCase() === "live"
                        ? "Published"
                        : "Draft"
                    }
                    user={fw.channel || "Unknown"}
                  />
                ))}
              </div>
            )}
            <Link href="/frameworks">
              <Button
                className="w-full mt-4"
                variant="outline"
                rightIcon={<ArrowRight size={16} />}
              >
                View All Frameworks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
