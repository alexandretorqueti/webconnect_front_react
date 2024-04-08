import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

function SuggestionsItemComponent(props) {
  return <div className="text-center story">
  <div className="story-profile">
    <Image
      className="avatar-50 rounded-pill"
      src={props.imagem}
      alt=""
      loading="lazy"
    />

    <Link
      onClick={props.handleFollow}
      className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
    >
    { props.name }
    </Link>
  </div>

  <Link
    onClick={props.handleFollow}
    className="align-items-center d-flex"
  >
    <small>Follow</small>{" "}
  </Link>
</div>;
}

export default SuggestionsItemComponent;