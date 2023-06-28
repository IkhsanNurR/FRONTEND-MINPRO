import { DataCarousel } from "@/data";
import { Carousel } from "react-responsive-carousel";
import { Item } from "./items";
import { TestimoniItem } from "./items";
import { Testimoni } from "@/data";

export const Example = () => {
  return (
    <Carousel>
      {DataCarousel.map((data: any, i: any) => (
        <Item key={i} data={data} />
      ))}
    </Carousel>
  );
};

// export default Example

export const TestimoniReview = () => {
  const itemsPerPage = 3;
  const totalItems = Testimoni.length;
  const totalSlides = Math.ceil(totalItems / itemsPerPage);

  const renderSlides = () => {
    const slides = [];

    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slideItems = Testimoni.slice(startIndex, endIndex);

      slides.push(
        <div key={i} className="flex justify-center">
          {slideItems.map((testimoni, j) => (
            <TestimoniItem key={j} testimoni={testimoni} />
          ))}
        </div>
      );
    }

    return slides;
  };
  // return(
  //     <Carousel>
  //         {Testimoni.map((testimoni:any, i:number) => <TestimoniItem key={i} testimoni={testimoni} />)}
  //     </Carousel>
  // )
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
    //   renderArrowPrev={(clickHandler, hasPrev, label) =>
    //     hasPrev && (
    //     //   <button
    //     //     className="carousel-arrow carousel-arrow-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
    //     //     onClick={clickHandler}
    //     //   >
    //     //     Prev
    //     //   </button>
    //     )
    //   }
    //   renderArrowNext={(clickHandler, hasNext, label) =>
    //     hasNext && (
    //     //   <button
    //     //     className="carousel-arrow carousel-arrow-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
    //     //     onClick={clickHandler}
    //     //   >
    //     //     Next
    //     //   </button>
    //     )
    //   }
    >
      {renderSlides()}
    </Carousel>
  );
};
