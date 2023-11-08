import { Stack, Form, Row, Col, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { NewNoteProps } from "./NewNote";
import { useRef, FormEvent, useState } from "react";
import { Tag } from "../type";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  addTag,
  title = "",
  markdown = "",
  availableTags,
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };
  const handleClean = () => {
    titleRef.current!.value = "";
    markdownRef.current!.value = "";
    setSelectedTags([]);
  };
  return (
    <div className="border p-3 rounded shadow">
      <Form onSubmit={handleSubmit} className="mt-3">
        <Stack gap={5} className="">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  defaultValue={title}
                  ref={titleRef}
                  className="shadow"
                  required
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
                  onCreateOption={(label) => {
                    const newTag: Tag = { id: v4(), label };
                    addTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
                  options={availableTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  isMulti
                  className="shadow"
                ></ReactSelect>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Contents</Form.Label>
            <Form.Control
              defaultValue={markdown}
              ref={markdownRef}
              required
              as={"textarea"}
              className="shadow"
              rows={5}
            />
          </Form.Group>
          <Stack direction="horizontal" className="justify-content-end" gap={2}>
            <Button
              type="submit"
              variant="success"
              style={{ width: "120px" }}
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-floppy"
                viewBox="0 0 16 16"
              >
                <path d="M11 2H9v3h2V2Z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z" />
              </svg>
              Save
            </Button>
            <Button
              onClick={handleClean}
              variant="danger"
              style={{ width: "100px" }}
              type="button"
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>{" "}
              Clear
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="warning"
              style={{ width: "100px" }}
              type="button"
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-backward"
                viewBox="0 0 16 16"
              >
                <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
              </svg>
              Back
            </Button>
          </Stack>
        </Stack>
      </Form>
    </div>
  );
};

export default NoteForm;
