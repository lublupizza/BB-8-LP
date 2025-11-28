export interface VkAction {
  type: 'text' | 'open_link' | 'location' | 'callback';
  label: string;
  link?: string;
  payload?: string; // JSON string
}

export interface VkButton {
  action: VkAction;
  color?: 'primary' | 'secondary' | 'positive' | 'negative';
}

export interface VkKeyboard {
  one_time: boolean;
  inline: boolean;
  buttons: VkButton[][];
}

export interface BotScenario {
  id: string;
  title: string;
  description: string;
  botMessage: string; // The text the bot sends
  keyboard: VkKeyboard; // The JSON structure for VK
  nextActions?: string[]; // IDs of scenarios this might lead to (for simulation)
}

export interface AnalyticsMetric {
  name: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface OrderRejectionReason {
  reason: string;
  count: number;
}

export interface DailyUserStat {
  date: string;
  newUsers: number;
  orders: number;
}