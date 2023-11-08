import { useNote } from "../NoteDetail/Layout";
import { NoteData, Tag } from "../type";
import NoteForm from "./NoteForm";

type EditProps = {
  onUpdate: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ addTag, onUpdate, availableTags }: EditProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Edit</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onUpdate(note.id, data)}
        addTag={addTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
