import {
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchItemComponent(props) {
  return (
    <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
        <div className="flex-shrink-0">
        <Image
            className="align-self-center img-fluid avatar-50 rounded-pill"
            src={ props.image } 
            alt=""
            loading="lazy"
        />
        </div>

        <div className="d-flex flex-column ms-3">
        <Link to="/" className="h5">
            { props.name }
        </Link>

        <span>
            { props.subtitle }
        </span>
        </div>

        <div className="d-flex align-items-center ms-auto">
        <Link to="/" className="me-3 d-flex align-items-center">
            <small>Follow</small>{" "}
        </Link>

        <Link
            to="/"
            className="material-symbols-outlined text-dark"
        >
            close
        </Link>
        </div>
    </div>
  );
}

export default SearchItemComponent;