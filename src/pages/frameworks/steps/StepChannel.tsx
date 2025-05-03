import React from 'react';
import Input from '../../../components/ui/Input';

interface StepChannelProps {
  channelData: {
    name: string;
    code: string;
  };
  updateChannelData: (data: { name: string; code: string }) => void;
}

const StepChannel: React.FC<StepChannelProps> = ({ channelData, updateChannelData }) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Channel Information
        </h3>
        <p className="text-muted-foreground mt-1">
          Provide basic details about the channel you're creating.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Channel Name"
          value={channelData.name}
          onChange={(e) => updateChannelData({ ...channelData, name: e.target.value })}
          placeholder="e.g., Youthnet Channel"
          hint="Name should be descriptive and unique"
          required
        />

        <Input
          label="Channel Code"
          value={channelData.code}
          onChange={(e) => updateChannelData({ ...channelData, code: e.target.value })}
          placeholder="e.g., youthnet-channel"
          hint="Code must be unique and use hyphens"
          required
        />
      </div>
    </div>
  );
};

export default StepChannel; 