import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./componenets/NewNote";
import EditNote from "./componenets/EditNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useLocaleStorage } from "./useLocaleStorage";
import { NoteData, RawNote, Tag } from "./type";
import { v4 } from "uuid";
import MainPage from "./MainPage";
import { useMemo } from "react";
import Layout from "./NoteDetail/Layout";
import NoteDetail from "./NoteDetail/NoteDeail";
import Header from "./componenets/Header";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [
        ...prev,
        { ...data, id: v4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  }

  return (
    <>
      <Header />
      <Container className="p-3">
        <Routes>
          <Route
            path="/"
            element={<MainPage notes={noteWithTags} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                addTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  addTag={addTag}
                  availableTags={tags}
                  onUpdate={onUpdateNote}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
