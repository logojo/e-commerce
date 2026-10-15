"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IoCart, IoCartOutline } from "react-icons/io5";

type FlyingProductProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
  image: string;
};

export function FlyingIcon({
  startX,
  startY,
  endX,
  endY,
  onComplete,
  image
}: FlyingProductProps) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: endX - startX,
        y: endY - startY,
        opacity: 0,
        scale: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        left: startX - 20,
        top: startY - 20,
        pointerEvents: "none",
      }}
      className="z-9999 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
    >
      <Image 
            src={`/products/${image}`}
            alt='imagen del producto'
            className='md:rounded object-fill bg-gray-500 w-auto h-auto '
            width={100}
            height={100}       
           loading="eager"
        />
    </motion.div>
  );
}