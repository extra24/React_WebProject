import PropTypes from "prop-types";

//Movies : 영화 상세 정보 컴포넌트
function Movies({ id, coverImg, title, summary, genres }) {
  return (
    <div id={id}>
      <img src={coverImg} alte={title} />
      <h2>{title}</h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={`${id}-${g}`}>{g}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

Movies.prototypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movies;
