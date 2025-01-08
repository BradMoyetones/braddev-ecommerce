export type CategoryType = {
    id: number;
    attributes: { 
        categoryName: string;
        description: string;
        slug: string;
        mainImage: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };      
    };
};