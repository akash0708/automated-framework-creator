import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { useFrameworkFormStore } from "../../store/frameworkFormStore";
import Button from "../../components/ui/Button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateChannel: React.FC = () => {
  const channel = useFrameworkFormStore((state) => state.channel);
  const setChannel = useFrameworkFormStore((state) => state.setChannel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // Validation: both fields required
    if (!channel.name.trim() || !channel.code.trim()) {
      setError("Both Channel Name and Channel Code are required.");
      return;
    }
    setLoading(true);
    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy validation - fail if code is "test" (to demonstrate error handling)
      if (channel.code.toLowerCase() === "test") {
        throw new Error(
          'Channel code "test" is reserved. Please choose another code.'
        );
      }

      // Simulate successful response
      const data = {
        result: {
          responseCode: "OK",
          channel: {
            identifier: "ch_" + Math.random().toString(36).substring(2, 10),
            name: channel.name,
            code: channel.code,
            createdAt: new Date().toISOString(),
          },
        },
      };

      console.log("Channel created (simulated):", data.result.channel);
      setSuccess("Channel created successfully!");
      setChannel({ name: "", code: "" });
      setTimeout(() => navigate("/channels"), 1000);
    } catch (err: any) {
      setError(err.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-slate-100 p-0"
      >
        {/* Header Section */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl sm:text-2xl font-bold">Create New Channel</h2>
        </div>
        {/* Info Section */}
        <div className="px-8 pt-6 pb-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Channel Information
          </h3>
          <p className="text-muted-foreground mb-6">
            Provide basic details about the channel you're creating.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Channel Name"
              value={channel.name}
              onChange={(e) => setChannel({ ...channel, name: e.target.value })}
              placeholder="e.g., Youthnet Channel"
              hint="Name should be descriptive and unique"
              required
            />
            <Input
              label="Channel Code"
              value={channel.code}
              onChange={(e) => setChannel({ ...channel, code: e.target.value })}
              placeholder="e.g., youthnet-channel"
              hint="Code must be unique and use hyphens"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-4 font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm mt-4 font-medium">
              {success}
            </div>
          )}
        </div>
        {/* Footer Section */}
        <div className="flex items-center justify-end gap-4 px-8 py-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <Button
            type="submit"
            isLoading={loading}
            className="px-6 font-semibold flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            leftIcon={<PlusCircle size={22} className="mr-2" />}
          >
            Create Channel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel;
