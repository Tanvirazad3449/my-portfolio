import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React from 'react';

const items = [1, 2, 3, 4, 5, 6];

function CustomCarousel() {
  return (
    <Carousel>
      <CarouselContent className="flex">
        {items.map((item) => (
          <CarouselItem key={item} className="flex-shrink-0 w-full md:w-1/6 p-2">
            <div className="h-96 w-full bg-blue-500 flex items-center justify-center text-white text-2xl rounded-lg">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CustomCarousel;
