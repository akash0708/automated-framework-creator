import React, { useEffect, useState } from "react";
import { useFrameworkFormStore } from "../../../store/frameworkFormStore";

interface Channel {
  identifier: string;
  name: string;
  code: string;
  status: string;
}

const StepChannel: React.FC = () => {
  const channel = useFrameworkFormStore((state) => state.channel);
  const setChannel = useFrameworkFormStore((state) => state.setChannel);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      setError(null);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("tenantId", process.env.NEXT_PUBLIC_TENANT_ID);
        myHeaders.append(
          "Authorization",
          `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        );
        myHeaders.append("Cookie", process.env.NEXT_PUBLIC_COOKIE);

        const raw = JSON.stringify({
          request: {
            filters: {
              status: ["Live"],
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

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Select Channel
        </h3>
        <p className="text-muted-foreground mt-1">
          Choose the channel for which you want to create the framework.
        </p>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading channels...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <div className="max-w-sm">
          <label className="block text-sm font-medium mb-2">Channel</label>
          <select
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={channel?.code || ""}
            onChange={(e) => {
              const selected = channels.find(
                (ch) => ch.code === e.target.value
              );
              if (selected) setChannel(selected);
            }}
          >
            <option value="">Select a channel...</option>
            {channels.map((ch) => (
              <option key={ch.code} value={ch.code}>
                {ch.name} ({ch.code})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StepChannel;
