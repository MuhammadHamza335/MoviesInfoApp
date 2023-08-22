"use client";
import { fetchFromUrl } from "@/utils/constants";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Trending from "@/components/Trending/Trending";

export default function Home() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery("config", () =>
    fetchFromUrl("/configuration")
  );

  useEffect(() => {
    console.log("component mount");
  }, []);

  useEffect(() => {
    console.log("dispatching");
    if (data) {
      const url = {
        backdrop: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <HeroBanner />
      <Trending />
      <Footer />
    </>
  );
}
