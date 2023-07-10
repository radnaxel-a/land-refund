export interface GetShortUrlByIdResponseModel {
    success: boolean;
    data: {
        id: string;
        original_address: string;
        short_address: string;
    };
}
