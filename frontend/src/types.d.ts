interface MessagesState {
  items: Message[];
  isLoading: boolean;
  error: string | null;
}

interface Message {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

interface MessageMutation {
  author: string;
  message: string;
  image?: File | null;
}