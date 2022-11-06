export default interface NoteModel {
  title?: string;
  content?: string;
  audioRef?: any;
  imageRef?: any;
  audioPath?: any;
  imagePath?: any;
  path?: string;
  pinned?: boolean;
  createdAt?: any;
  uid?: string;
  id?: string;
  color?: string;
  selected?: boolean;
  type?: 'folder' | 'note';
}