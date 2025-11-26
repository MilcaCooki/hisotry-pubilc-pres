export type IconName = 
  | 'Brain' | 'Gavel' | 'Users' | 'Zap' | 'Globe' | 'Shield' | 'Scale' 
  | 'Landmark' | 'Building' | 'Scroll' | 'Coins' | 'Eye' | 'Network' 
  | 'Lock' | 'Fingerprint' | 'Vote' | 'Activity' | 'Target' | 'TrendingUp'
  | 'Book' | 'Briefcase' | 'Flag' | 'Map' | 'MessageCircle' | 'CheckCircle' 
  | 'User' | 'Award' | 'FileText' | 'PieChart' | 'Layers' | 'ArrowRight' | 'Quote';

export interface ContentItem {
  icon?: IconName;
  title: string;
  text: string;
  subtext?: string; // Additional detail
  value?: string; // For stats
  date?: string; // For timelines
}

export type SlideLayout = 
  | 'split'          // Text Left, List Right
  | 'compare'        // Two cards comparing concepts
  | 'center-quote'   // Big quote in middle
  | 'grid-3'         // 3 Cards
  | 'timeline'       // Vertical steps
  | 'stats'          // Big numbers/Charts
  | 'process'        // Horizontal flow
  | 'features'       // Dense list for detailed features
  | 'pyramid';       // Hierarchical levels

export interface SlideContent {
  left?: string; // For split layout main text
  right?: ContentItem[] | ContentItem; // For split/compare
  quote?: string; // For quote layout
  author?: string; // For quote author
  points?: string[]; // For quote layout tags
  items?: ContentItem[]; // For grids, timelines, stats, features
  steps?: ContentItem[]; // For process
  levels?: ContentItem[]; // For pyramid
}

export interface Slide {
  title: string;
  subtitle: string;
  layout: SlideLayout;
  icon?: IconName;
  content: SlideContent;
}

export interface Presentation {
  id: number;
  title: string;
  shortTitle: string;
  themeGradient: string;
  accentColor: string; // Tailwind text class, e.g., 'text-blue-400'
  accentColorHex: string; // For inline styles
  secondaryColor: string; // Tailwind text class for variety
  slides: Slide[];
}