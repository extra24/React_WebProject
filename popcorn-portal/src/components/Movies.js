import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

//@TODO : 상세 설명을 한글로 번역, 요약해주는 AI 추가

//Movies : 영화 상세 정보 컴포넌트
function Movies({ id, coverImg, title, summary, genres }) {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <img
        src={coverImg}
        alt={title}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          objectFit: "cover",
          marginBottom: "5px",
        }}
      />
      <Typography
        variant="h6"
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "5px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3, // summary의 최대 줄 수 설정
          WebkitBoxOrient: "vertical",
        }}
      >
        {summary}
      </Typography>
    </Box>

    // <div id={id}>
    //   <img src={coverImg} alte={title} />
    //   <h2>{title}</h2>
    //   <p>{summary}</p>
    //   <ul>
    //     {genres.map((g) => (
    //       <li key={`${id}-${g}`}>{g}</li>
    //     ))}
    //   </ul>
    // </div>
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
