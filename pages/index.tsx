/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import "animate.css/animate.min.css";
import { TOPRigthSVG } from "components/SVGList";
import ImageGallery from "react-image-gallery";

// import "bootstrap/dist/css/bootstrap.min.css";

import { TOPLeftSVG } from "components/SVGList";
import Button from "components/Button";
import Footer from "components/Footer";
import { Bounce, Flip, Fade } from "react-reveal";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { firstSlide, secondSlide, thirdSlide, Slides } from "config";
import { getEvents } from "actions/getEvents";
import { EventType } from "utils/utils";

function getImageSrc(image): string {
  return image.src.toString();
}
export default function HomePage(props: {
  startLoading: Function;
  closeLoading: Function;
  pageLoading: boolean;
}) {
  const [event, setEvent] = useState<EventType[]>([]);
  const [image, setImage] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(() =>
    getImageSrc(firstSlide)
  );
  const [currentGameType, setCurrentGameType] = useState<string>();
  const [currentTitle, setCurrentTitle] = useState<string>();
  const [imgaeStatus, setImageStatus] = useState<number>(0);
  const fetchData = async () => {
    const getData = await getEvents();
    setEvent(getData);
    return getData;
  };
  useEffect(() => {
    fetchData();
    console.log("Data1>>>>>", event);
  }, []);

  const handleSelectImage = (item: EventType, index) => {
    setCurrentImage(item.eventDetails?.eventAnnouncementImage);
    setCurrentGameType(item.eventDetails?.gameType);
    setCurrentTitle(item.eventDetails?.eventAnnouncementTitle);
    setImageStatus(index);
    clearInterval(0);
  };

  setTimeout(() => {
    let imgIndex = image + 1;

    if (imgIndex > 3) {
      imgIndex = 1;
    }
    setImage(imgIndex);
  }, 5000);

  useEffect(() => {
    // const data = fetchData;
    const data = async () => {
      try {
        const getData = await getEvents();
        console.log(
          image - 1,
          getData[image - 1].eventDetails?.eventAnnouncementImage
        );
        setCurrentImage(
          getData[image - 1].eventDetails?.eventAnnouncementImage
        );
        setCurrentGameType(getData[image - 1].eventDetails?.gameType);
        setCurrentTitle(
          getData[image - 1].eventDetails?.eventAnnouncementTitle
        );
      } catch (e) {
        console.log("error");
      }
    };
    data();
    setImageStatus(image - 1);
  }, [image]);

  return (
    <>
      <main>
        <div className="container w-full mx-auto max-sm:px-10 ">
          <div className="main-content  mx-auto max-w-full w-[1020px] mt-14 grid grid-cols-4 gap-4 max-sm:grid-cols-1">
            <div className="col-span-3 relative max-sm:hidden duration-300 transition-all">
              <div className="absolute right-0 top-0 z-10">
                <TOPRigthSVG />
              </div>

              <CSSTransition
                key={currentImage}
                timeout={5000}
                classNames="fade"
              >
                <Image
                  src={currentImage}
                  className={`w-full h-full object-cover animate__animated animate__slideInLeft`}
                  width={1000}
                  height={620}
                />
              </CSSTransition>

              {/* <ImageGallery
                items={images}
                autoPlay={true}
                showPauseButton={false}
              /> */}

              <div className="absolute bottom-0 w-full bg-black/30 bg-gradient-to-b from-black/10 to-black/60">
                <p className="p-4 text-4xl uppercase font-normal text-white">
                  {currentGameType}
                </p>
                <p className="pl-4 pb-10 text-2xl text-white opacity-60">
                  {currentTitle}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[11px] ">
              {event.map((item, index = 3) => (
                <div
                  key={index}
                  className={`relative  hover:cursor-pointer ${
                    imgaeStatus === index ? "border-2 border-[#5EF388]" : ""
                  }`}
                  onClick={() => handleSelectImage(item, index)}
                >
                  <div
                    className={`absolute left-0 top-0 z-10 -rotate-90  ${
                      imgaeStatus === index ? "" : "hidden"
                    }`}
                  >
                    <TOPRigthSVG />
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/30 bg-gradient-to-b from-black/10 to-black/60">
                    <p className="p-4 text-lg uppercase font-normal text-white">
                      {item.eventDetails?.gameType}:
                      <br /> {item.eventDetails.eventAnnouncementTitle}
                    </p>
                  </div>
                  <Image
                    src={item.eventDetails?.eventAnnouncementImage}
                    className="max-h-[146px] min-h-[146px] object-cover w-full"
                    width={500}
                    height={300}
                  />
                  <div className="absolute bottom-0 w-full bg-black/30 bg-gradient-to-b from-black/10 to-black/60">
                    <p className="p-4 text-lg uppercase font-normal text-white">
                      {item.eventDetails?.gameType}:
                      <br /> {item.eventDetails.eventAnnouncementTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="main-content text-3xl mx-auto mb-10 max-sm:max-w-full lg:w-[1020px]  h-auto sm:mt-14   font-semibold">
            <div className="uppercase text-5xl tracking-widest text-white">
              Featured Apps
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2 max-lg:grid-cols-1 max-lg:w-full">
              <div>
                <Link href="https://skatex.io/staking">
                  <div className="flex items-center justify-center bg-stone-200  cursor-pointer select-none p-10 border-2 border-white">
                    <p className="uppercase">Staking</p>
                  </div>
                </Link>
                <div className="text-white space-y-2 mb-4">
                  <p className="uppercase text-base ">web3 app</p>

                  <p className=" text-2xl">
                    Stake your NFT and <br />
                    collect GRIND
                  </p>
                </div>
                <a
                  href="https://skatex.io/staking"
                  className="bg-[#5EF388] text-xl mt-4 max-sm:w-full px-10 py-2"
                >
                  PLAY
                </a>
              </div>
              <div>
                <Link href="http://skatex.io/xmachine">
                  <div className="flex items-center justify-center bg-stone-200  cursor-pointer select-none p-10  border-2 border-white">
                    <p className="uppercase">X-Machine</p>
                  </div>
                </Link>
                <div className="text-white space-y-2 mb-4">
                  <p className="uppercase text-base">web3 app</p>

                  <p className=" text-2xl">
                    Play the X-Machine for <br />
                    exclusive prizes
                  </p>
                </div>
                <a
                  href="http://skatex.io/xmachine"
                  className="bg-[#5EF388] text-xl mt-4 max-sm:w-full px-10 py-2"
                >
                  PLAY
                </a>
              </div>
              <div>
                <Link href="https://kickflip.skatex.io/">
                  <div className="flex items-center justify-center bg-stone-200  cursor-pointer select-none p-10  border-2 border-white">
                    <p className="uppercase">Mini KickFlip</p>
                  </div>
                </Link>
                <div className="text-white space-y-2 mb-4">
                  <p className="uppercase text-base ">web3 app</p>

                  <p className="e text-2xl">
                    Think you can pick the <br />
                    right call?
                  </p>
                </div>
                <a
                  href="https://kickflip.skatex.io/"
                  className="bg-[#5EF388] text-xl mt-4 max-sm:w-full px-10 py-2"
                >
                  PLAY
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  }
];