import { Button, Col, Row, Form, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import ReactSelect from "react-select";
import { Tag } from "./type";
import NoteCard, { NoteType } from "./NoteCard";

type MainProps = {
  availableTags: Tag[];
  notes: NoteType[];
};

const MainPage = ({ notes, availableTags }: MainProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          )) &&
        (!activeTag || note.tags.some((tag) => tag.id === activeTag))
      );
    });
  }, [title, selectedTags, notes, activeTag]);

  const handleBadgeClick = (tagId: string) => {
    setActiveTag(tagId === activeTag ? null : tagId);
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Training Notes</h1>
        </Col>
        <Col className="d-flex justify-content-end col-1">
          <Link to={"/new"}>
            <Button variant="outline-info" style={{ width: "120px" }}>
              New
            </Button>
          </Link>
        </Col>
      </Row>
      <Form className="border p-3 rounded shadow-lg bg-success-subtle mt-3">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className="">Search in title...</Form.Label>
              <Form.Control
                type="text"
                placeholder="search"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      id: tag.value,
                      label: tag.label,
                    }))
                  )
                }
                options={availableTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Stack
        direction="horizontal"
        gap={2}
        className="flex-wrap mt-4 border p-2 rounded py-4"
        style={{ cursor: "pointer", justifyContent: "center" }}
      >
        {availableTags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              fontWeight: "normal",
              fontSize: "14px",
              justifyItems: "center",
            }}
            className={activeTag === tag.id ? "active bg-success" : ""}
            onClick={() => handleBadgeClick(tag.id)}
          >
            # {tag.label}
          </Badge>
        ))}
      </Stack>
      <Row className="mt-4 g-3" xs={1} sm={2} lg={3} xl={4}>
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;
