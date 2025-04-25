"use client";
import React, { useEffect } from "react";
import Header from "./header";
import HeroSection from "./hero-section";
import ProductsSection from "./products-section";
import Features from "./features";
import Testimonials from "./testimonials";
import Footer from "./footer";
import Billing from "./billing";
import { usePathname, useSearchParams } from "next/navigation";

const Landing = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const hash = window.location.hash.substring(1);
  //     const element = document.getElementById(hash);

  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [pathname, searchParams]);
  return (
    <>
      <Header />
      <HeroSection />
      <ProductsSection />
      <Features />
      <Billing />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Landing;
