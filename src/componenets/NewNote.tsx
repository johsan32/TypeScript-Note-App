import { NoteData, Tag } from "../type";
import NoteForm from "./NoteForm";

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  return (
    <>
      <h1>Add New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
