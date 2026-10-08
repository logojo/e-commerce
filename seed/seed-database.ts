import { initialData } from "./seeder.ts";
import { prisma }  from   '../lib/prisma.ts'

async function main() {
    //1. Borrar registros previos
    
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    

    const {categories, products }  = initialData;

    const categoriesData = categories.map( category => ({
        name: category
    }));

    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce(( map, category ) => {
        map[category.name.toLocaleLowerCase()] = category.id
        return map
    }, {} as Record<string,string>)

    products.forEach( async({images, type, ...product}) => {
        const dbProduct = await prisma.product.create({
            data: {
                ...product,
                categoryId: categoriesMap[type]
            }
        })

        const imagesData = images.map( image =>({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    // const productData = products.map( ({images, type, ...product}) => ({
    //     ...product,
    //     categoryId: categoriesMap[type]
    // }));

    // await prisma.product.createMany({
    //     data: productData
    // })

    // const productsDB = await prisma.product.findMany();

    // const productsMap = productsDB.reduce(( map, product ) => {
    //     map[product.slug] = product.id
    //     return map
        
    // }, {} as Record<string,string>)

    // const productImagesData = products.flatMap( product => {
    //     return  product.images.map( image => ({
    //         url: image,
    //         productId: productsMap[product.slug]
    //     }))
    // })

    // await prisma.productImage.createMany({
    //     data: productImagesData
    // })

    console.log('SEED EXECUTED'); 
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();