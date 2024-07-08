export interface ListGroupProps {
  heading: string;
  description: string;
  items: ListGroupObject[];
}

export interface ListGroupObject {
  id: number;
  name: string;
  onItemSelected?: (item: number) => void;
}
