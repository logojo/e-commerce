export const generatePagination = (currentPage: number, totalPages : number) => {

    //Si el número total de paginas es 7 o menos, se muestran todas la s paginas
    if( totalPages <= 7 ) {
       return  Array.from({ length: totalPages }, (_, index) => index + 1 ) ; 
    }

    //Si la pagna actual esta entre las primeras 3 paginas, mostrar las primeras 3 ... y las ultimas 2
    if( currentPage <= 3 ) {
       return  [1,2,3,'...', totalPages -1, totalPages ]; 
    }

    //Si la pagna actual esta entre las ultimas 3 paginas, mostrar las primeras 2 ... y las ultimas 3
    if( currentPage >= totalPages -2  ) {
       return  [1,2,'...', totalPages -2, totalPages -1, totalPages ]; 
    }

    //Si la pagna actual en medio, mostrar las primera pagina  ... y la pagina actual y las siguientes
    return  [1,'...', currentPage - 1, currentPage, currentPage + 1,'...', totalPages ]; 
    
}