// Source de données des projets avec images responsives
// Chaque projet: id, slug, title, subtitle, images (mobile/tablet/desktop), featuredOrder

// Imports des images (desktop/tablet/mobile)
import seraphDesktop from "../assets/portfolio/desktop/image-seraph.jpg";
import seraphTablet from "../assets/portfolio/tablet/image-seraph.jpg";
import seraphMobile from "../assets/portfolio/mobile/image-seraph.jpg";

import eeboxDesktop from "../assets/portfolio/desktop/image-eebox.jpg";
import eeboxTablet from "../assets/portfolio/tablet/image-eebox.jpg";
import eeboxMobile from "../assets/portfolio/mobile/image-eebox.jpg";

import federalDesktop from "../assets/portfolio/desktop/image-federal.jpg";
import federalTablet from "../assets/portfolio/tablet/image-federal.jpg";
import federalMobile from "../assets/portfolio/mobile/image-federal.jpg";

import delSolDesktop from "../assets/portfolio/desktop/image-del-sol.jpg";
import delSolTablet from "../assets/portfolio/tablet/image-del-sol.jpg";
import delSolMobile from "../assets/portfolio/mobile/image-del-sol.jpg";

import prototypeDesktop from "../assets/portfolio/desktop/image-prototype.jpg";
import prototypeTablet from "../assets/portfolio/tablet/image-prototype.jpg";
import prototypeMobile from "../assets/portfolio/mobile/image-prototype.jpg";

import tower228bDesktop from "../assets/portfolio/desktop/image-228b.jpg";
import tower228bTablet from "../assets/portfolio/tablet/image-228b.jpg";
import tower228bMobile from "../assets/portfolio/mobile/image-228b.jpg";

import edelweissDesktop from "../assets/portfolio/desktop/image-edelweiss.jpg";
import edelweissTablet from "../assets/portfolio/tablet/image-edelweiss.jpg";
import edelweissMobile from "../assets/portfolio/mobile/image-edelweiss.jpg";

import netcryDesktop from "../assets/portfolio/desktop/image-netcry.jpg";
import netcryTablet from "../assets/portfolio/tablet/image-netcry.jpg";
import netcryMobile from "../assets/portfolio/mobile/image-netcry.jpg";

import hypersDesktop from "../assets/portfolio/desktop/image-hypers.jpg";
import hypersTablet from "../assets/portfolio/tablet/image-hypers.jpg";
import hypersMobile from "../assets/portfolio/mobile/image-hypers.jpg";

import sxivDesktop from "../assets/portfolio/desktop/image-sxiv.jpg";
import sxivTablet from "../assets/portfolio/tablet/image-sxiv.jpg";
import sxivMobile from "../assets/portfolio/mobile/image-sxiv.jpg";

import trinityDesktop from "../assets/portfolio/desktop/image-trinity.jpg";
import trinityTablet from "../assets/portfolio/tablet/image-trinity.jpg";
import trinityMobile from "../assets/portfolio/mobile/image-trinity.jpg";

import paramourDesktop from "../assets/portfolio/desktop/image-paramour.jpg";
import paramourTablet from "../assets/portfolio/tablet/image-paramour.jpg";
import paramourMobile from "../assets/portfolio/mobile/image-paramour.jpg";

export const projects = [
  {
    id: "seraph",
    slug: "seraph-station",
    title: "Seraph Station",
    subtitle: "September 2019",
    images: { mobile: seraphMobile, tablet: seraphTablet, desktop: seraphDesktop },
  },
  {
    id: "eebox",
    slug: "eebox-building",
    title: "Eebox Building",
    subtitle: "August 2017",
    images: { mobile: eeboxMobile, tablet: eeboxTablet, desktop: eeboxDesktop },
  },
  {
    id: "federal",
    slug: "federal-ii-tower",
    title: "Federal II Tower",
    subtitle: "March 2017",
    images: { mobile: federalMobile, tablet: federalTablet, desktop: federalDesktop },
  },
  {
    id: "del-sol",
    slug: "project-del-sol",
    title: "Project Del Sol",
    subtitle: "January 2016",
    featuredOrder: 1,
    images: { mobile: delSolMobile, tablet: delSolTablet, desktop: delSolDesktop },
  },
  {
    id: "prototype",
    slug: "le-prototype",
    title: "Le Prototype",
    subtitle: "October 2015",
    featuredOrder: 3,
    images: { mobile: prototypeMobile, tablet: prototypeTablet, desktop: prototypeDesktop },
  },
  {
    id: "228b",
    slug: "228b-tower",
    title: "228B Tower",
    subtitle: "April 2015",
    featuredOrder: 2,
    images: { mobile: tower228bMobile, tablet: tower228bTablet, desktop: tower228bDesktop },
  },
  {
    id: "edelweiss",
    slug: "grand-edelweiss-hotel",
    title: "Grand Edelweiss Hotel",
    subtitle: "December 2013",
    images: { mobile: edelweissMobile, tablet: edelweissTablet, desktop: edelweissDesktop },
  },
  {
    id: "netcry",
    slug: "netcry-tower",
    title: "Netcry Tower",
    subtitle: "August 2012",
    images: { mobile: netcryMobile, tablet: netcryTablet, desktop: netcryDesktop },
  },
  {
    id: "hypers",
    slug: "hypers",
    title: "Hypers",
    subtitle: "January 2012",
    images: { mobile: hypersMobile, tablet: hypersTablet, desktop: hypersDesktop },
  },
  {
    id: "sxiv",
    slug: "sxiv-tower",
    title: "SXIV Tower",
    subtitle: "March 2011",
    images: { mobile: sxivMobile, tablet: sxivTablet, desktop: sxivDesktop },
  },
  {
    id: "trinity",
    slug: "trinity-bank-tower",
    title: "Trinity Bank Tower",
    subtitle: "September 2010",
    images: { mobile: trinityMobile, tablet: trinityTablet, desktop: trinityDesktop },
  },
  {
    id: "paramour",
    slug: "project-paramour",
    title: "Project Paramour",
    subtitle: "February 2008",
    images: { mobile: paramourMobile, tablet: paramourTablet, desktop: paramourDesktop },
  },
];

export const featuredProjects = projects
  .filter((p) => typeof p.featuredOrder === "number")
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
  .slice(0, 3);


