export interface ConversationType {
  id: number;
  name: string;
  lastMessage: string;
}

export interface Props {
  conversations: ConversationType[];
}
