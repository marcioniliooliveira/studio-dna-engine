import type { Meta, StoryObj } from '@storybook/react';
import { WorkStage } from './WorkStage';

const meta: Meta<typeof WorkStage> = {
  title: 'Components/WorkStage',
  component: WorkStage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WorkStage>;

export const Default: Story = {
  args: {
    initialPortalProgress: 1.0,
  },
};

export const PortalExpanding: Story = {
  args: {
    initialPortalProgress: 0.35,
  },
};
