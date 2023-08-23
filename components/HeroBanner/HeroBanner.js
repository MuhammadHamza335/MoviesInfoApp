"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { fetchFromUrl } from "@/utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.scss";
import Link from "next/link";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);

  const { data, error, isLoading } = useQuery("upcoming", () =>
    fetchFromUrl("/movie/upcoming")
  );

  useEffect(() => {
    // console.log("changing bg image");
    if (data) {
      const bg =
        url.backdrop +
        data.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      console.log(bg);
      setBackground(bg);
    }
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      console.log("searched");
    }
  };

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <LazyLoadImage className="" alt="" effect="blur" src={background} />
        {/* <Image src={background} alt="banner" width={500} height={500} /> */}
      </div>

      <div className="opacity-layer"></div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <Link href={`/search/${query}`}>
              <button>Search</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className="heroBanner w-full bg-black flex items-center relative md:h-[700px]">
    //   <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">

    //   </div>

    //   <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-[#04152d]"></div>

    //   <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="heroBannerContent flex flex-col items-center text-white text-center max-w-[800px] mx-auto relative">
    //       <span className="title text-4xl font-semibold md:text-6xl mb-10 md:mb-0">
    //         Welcome.
    //       </span>
    //       <span className="subTitle text-base font-medium md:text-xl mb-40 md:mb-0">
    //         Millions of movies, TV shows and people to discover. Explore now.
    //       </span>
    //       <div className="flex items-center mt-8">
    //         <input
    //           type="text"
    //           placeholder="Search for a movie or tv show...."
    //           onChange={(e) => setQuery(e.target.value)}
    //           onKeyUp={searchQueryHandler}
    //           className="w-full h-12 bg-white outline-none border-0 rounded-l-xl pr-10 text-sm md:h-16 md:text-lg text-black px-3"
    //         />
    //         <button className="w-24 h-12 bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-semibold rounded-r-xl text-sm md:w-32 md:h-16 md:text-lg">
    //           Search
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HeroBanner;
