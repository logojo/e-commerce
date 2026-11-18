"use client";

import { useForm } from "react-hook-form";

import { Product } from "@/app/interfaces";
import { Category, ProductImage } from "@/generated/prisma/client";
import { Loader } from "@/app/components/ui/Loader";
import clsx from "clsx";
import Image from "next/image";
import { createUpdateProduct } from "@/app/actions/products/update-product";
import { redirect } from "next/navigation";


type FormInputs = {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  categoryId: string;
  gender: 'men' | 'women' | 'kid' | 'unisex'
}


interface Props {
  product: Partial<Product> & {productImages?: ProductImage[]} ;
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

  const { handleSubmit, register, getValues, setValue, watch,  formState: { errors, isSubmitting } } = useForm<FormInputs>({
    defaultValues: {
      ...product,
    },
  });

  //revisa si existe un cambio en sizes
  watch('sizes')

  const onSubmit = async (data: FormInputs) => {

   const formData = new FormData();

   const { ...productToSave } = data

    if( product.id ) {
      formData.append('id', product.id );
    }
    
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug );
    formData.append('description', productToSave.description );
    formData.append('price', productToSave.price.toString() );
    formData.append('inStock', productToSave.inStock.toString() );
    formData.append('sizes', productToSave.sizes.toString() );
    formData.append('tags', productToSave.tags.toString() );
    formData.append('categoryId', productToSave.categoryId );
    formData.append('gender', productToSave.gender );

    const { ok } = await createUpdateProduct( formData );

    if( ok ) {
       redirect('/products')
    }
    

  }

  const onSizeChange = ( size: string ) => {
     
    const sizes = new Set( getValues('sizes') );
    sizes.has( size ) ? sizes.delete(size) : sizes.add( size )
    setValue('sizes', Array.from( sizes) )

  }

  return (
    <form onSubmit={handleSubmit( onSubmit )} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("title", { required: "title is required" })}
          />
          {errors.title && <span className="text-rose-700 text-xs">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("slug", { required: "slug is required"  })}
          />
          {errors.slug && <span className="text-rose-700 text-xs">{errors.slug.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("description", { required: "description is required"  })}
          ></textarea>
          {errors.description && <span className="text-rose-700 text-xs">{errors.description.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("price", { required: "price is required",  valueAsNumber: true, min: {value: 0, message: 'minimum price 0' }  })}
          />
          {errors.price && <span className="text-rose-700 text-xs">{errors.price.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>In stock</span>
          <input type="number" className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("inStock", { required: "inStock is required",  valueAsNumber: true, min: {value: 1, message: 'minimum stock 1' }  })}
          />
          {errors.inStock && <span className="text-rose-700 text-xs">{errors.inStock.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border border-gray-200 rounded-md bg-gray-200"
            {...register("tags", { required: "tags is required" })}
          />
          {errors.tags && <span className="text-rose-700 text-xs">{errors.tags.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border border-gray-200 rounded-md bg-gray-200"  {...register("gender", { required: "gender is required" })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.gender && <span className="text-rose-700 text-xs">{errors.gender.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border border-gray-200 rounded-md bg-gray-200"  {...register("categoryId", { required: "category is required" })}>
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
          {errors.categoryId && <span className="text-rose-700 text-xs">{errors.categoryId.message}</span>}
        </div>

        <button className="btn-primary w-full active:scale-90"
          disabled={isSubmitting}
          type="submit"

        >
          {isSubmitting && <Loader />}
          Guardar
        </button>
        
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                <div 
                 key={size} 
                 className={
                  clsx(
                    "flex  items-center justify-center w-10 h-10 mr-2 border border-gray-200 rounded-md active:scale-90 cursor-pointer transition-all", {
                    "bg-blue-500 text-white": getValues('sizes')?.includes(size) 
                  }
                  )
                 }
                 onClick={() => onSizeChange( size ) }
                 >
                  <span>{size}</span>
                </div>
              ))
            }
            {errors.sizes && <span className="text-rose-700 text-xs">{errors.sizes.message}</span>}

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border border-gray-200 rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    
            {
              product?.productImages?.map( image =>  (
                <div  key={image.id} className="relative">
                  <Image
                   src={`/products/${image.url}`}
                   alt="image"
                   width={300}
                   height={300}
                   loading="eager"
                   className="rounded-t-xl relative"
                 />
                
                 <button type="button" 
                         className="btn-danger rounded-b-xl w-full text-sm active:scale-98 cursor-pointer"
                         onClick={() => console.log(image.id) }
                         >
                  Eliminar
                 </button>
               
                  
                </div>                
            
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};