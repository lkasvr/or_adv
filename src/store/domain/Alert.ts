export type Alert = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
  status: 'display' | 'displayed';
  duration?: number;
};
