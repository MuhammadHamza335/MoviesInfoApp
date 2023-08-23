"use client";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "./style.scss";
import PosterFallback from "@/public/images/no-poster.png";
import CircleRating from "../CircularRating/CircleRating";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);

  const posterUrl = data.poster_path
    ? url.backdrop + data.poster_path
    : PosterFallback;

  console.log(posterUrl);
  return (
    <div
      className="movieCard"
      //   onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <LazyLoadImage className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            {/* <Genres data={data.genre_ids.slice(0, 2)} /> */}
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
