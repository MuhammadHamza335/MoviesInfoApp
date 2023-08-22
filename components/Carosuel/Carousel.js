"use client";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// import Img from "../lazyLoadImage/Img";
import PosterFallback from "@/public/images/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRef } from "react";
import CircleRating from "../CircularRating/CircleRating";
import Link from "next/link";
const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  // const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <div
        className="wrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : PosterFallback;
              return (
                <Link
                  href={`/${item.media_type || endpoint}/${item.id}`}
                  key={item.id}
                  className="carouselItem"
                >
                  <div

                  // onClick={
                  //   () => Link("/aa")
                  //   // Link(`/${item.media_type || endpoint}/${item.id}`)
                  // }
                  >
                    <div className="posterBlock">
                      <div className="imageContainer">
                        <LazyLoadImage src={posterUrl} />
                        <CircleRating rating={item.vote_average.toFixed(1)} />
                      </div>
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date || item.first_air_date).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            {console.log("skeleton")}
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
