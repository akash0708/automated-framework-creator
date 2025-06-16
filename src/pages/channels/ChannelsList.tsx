"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Search, Filter } from "lucide-react";
import Button from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../lib/utils";

interface Channel {
  identifier: string;
  name: string;
  code: string;
  status: string;
  lastUpdatedOn?: string;
  createdAt: string;
  [key: string]: any;
}

const ChannelItem: React.FC<{ channel: Channel }> = ({ channel }) => (
  <div className="p-4 border-b border-border last:border-0">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div>
        <div className="flex items-center">
          <h3 className="font-medium text-lg">{channel.name}</h3>
          <Badge
            variant={
              channel.status?.toLowerCase() === "live" ? "success" : "secondary"
            }
            className="ml-3"
          >
            {channel.status?.toLowerCase() === "live" ? "Published" : "Draft"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Code: {channel.code} • Last updated:{" "}
          {channel.lastUpdatedOn
            ? formatDate(new Date(channel.lastUpdatedOn))
            : "-"}
        </p>
      </div>
      <div className="flex items-center mt-3 sm:mt-0">
        {/* Add view/edit links if needed */}
      </div>
    </div>
  </div>
);

const ChannelsList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      setError(null);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "tenantId",
          process.env.NEXT_PUBLIC_TENANT_ID as string
        );
        myHeaders.append(
          "Authorization",
          `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        );
        myHeaders.append("Cookie", process.env.NEXT_PUBLIC_COOKIE as string);

        const raw = JSON.stringify({
          request: {
            filters: {
              status: ["Draft", "Live"],
              objectType: "Channel",
            },
          },
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow" as RequestRedirect,
        };

        const url = `${process.env.NEXT_PUBLIC_INTERFACE_URL}/action/composite/v3/search`;
        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setChannels(
          Array.isArray(data.result.Channel) ? data.result.Channel : []
        );
      } catch (err: any) {
        setError(err.message || "Failed to fetch channels");
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  // Close filter popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  // Filter channels by search query (name or code) and selected status
  const filteredChannels = (channels || []).filter((channel) => {
    if (!channel) return false;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      channel.name?.toLowerCase().includes(q) ||
      channel.code?.toLowerCase().includes(q);
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(channel.status);
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!channels)
    return <div className="text-center py-8">No channels data available.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channels</h1>
          <p className="text-muted-foreground">Manage and create channels</p>
        </div>
        <Button leftIcon={<Plus size={16} />}>
          <Link href="/channels/create">Create Channel</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center relative">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search channels..."
            className="py-2 pl-10 pr-4 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <div className="mb-2 font-semibold text-base">
                Filter by Status
              </div>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {["Live", "Draft"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status)}
                      onChange={() => handleStatusChange(status)}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Card className="animate-fade-in">
        {filteredChannels.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No channels found.
          </div>
        ) : (
          filteredChannels.map((channel) =>
            channel ? (
              <Link
                href={`/channels/${channel.identifier}`}
                key={channel.identifier}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {channel.name}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Code: {channel.code}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Created:{" "}
                      {new Date(channel.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ) : null
          )
        )}
      </Card>
    </div>
  );
};

export default ChannelsList;
