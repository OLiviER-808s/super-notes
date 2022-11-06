export default interface FolderModel {
  id?: string;
  path?: string;
  name?: string;
  uid?: string;
  createdAt?: any;
  color?: string;
  pinned?: boolean;
  selected?: boolean;
  type?: 'folder' | 'note';
}