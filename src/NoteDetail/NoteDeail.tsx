import { Badge, Button, Container, Row, Stack } from "react-bootstrap";
import { useNote } from "./Layout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteDetailProps = {
  onDelete: (id: string) => void;
};

const NoteDetail = ({ onDelete }: NoteDetailProps) => {
  const note = useNote();

  return (
    <Container className="border p-3 rounded ">
      <Row>
        <h1 className="mb-3">{note.title}</h1>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
      <Row xs="auto">
        {note.tags.length > 0 && (
          <Stack
            direction="horizontal"
            gap={2}
            className="flex-wrap justify-content-between mt-3"
          >
            {note.tags.map((tag) => (
              <Badge className="fw-normal fs-6"># {tag.label}</Badge>
            ))}
          </Stack>
        )}

        <Stack
          direction="horizontal"
          gap={2}
          className="align-items-center justify-content-end mt-5 w-100"
        >
          <Link to={`/${note.id}/edit`}>
            <Button variant="outline-warning" style={{ width: "120px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>{" "}
              Edit
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            style={{ width: "120px" }}
            onClick={() => onDelete(note.id)}
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
            Delete
          </Button>
          <Link to={"/"}>
            <Button variant="outline-info" style={{ width: "120px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-backward"
                viewBox="0 0 16 16"
              >
                <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
              </svg>{" "}
              Back
            </Button>
          </Link>
        </Stack>
      </Row>
    </Container>
  );
};

export default NoteDetail;
