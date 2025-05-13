import { BeltRank } from '../../types/BeltRank';
import { baseApi } from './baseApi';

export const beltRanksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBeltRanks: builder.query<BeltRank[], void>({
            query: () => 'BeltRanks',
            providesTags: ['BeltRank']
        })
    })
});

export const {
    useGetBeltRanksQuery
} = beltRanksApi; 