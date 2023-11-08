import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "./type";

export type NoteType = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteCard = ({ id, title, tags }: NoteType) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="Card h-100 text-reset text-decoration-none shadow mb-5"
    >
      <Card.Body>
        <Stack
          direction="vertical"
          gap={2}
          className="align-items-center text-start h-100"
        >
          <Stack
            direction="horizontal"
            className="align-items-start justify-content-between"
          >
            <p className="align-self-start fs-6">{title}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search text-warning hover-zoom"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Stack>

          {tags.length > 0 && (
            <Stack direction="horizontal" gap={3}>
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  className="text-truncate flex-wrap fw-light bg-success"
                >
                  # {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
