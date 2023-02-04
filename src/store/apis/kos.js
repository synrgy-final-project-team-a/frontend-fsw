import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const kosApi = createApi({
	reducerPath: "kosApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://production-service.herokuapp.com/' }),
	tagTypes: ['Kos'],
	endpoints: (build) => ({
		searchKeyword: build.mutation({
			query: (keyword) => ({
				url: `api/kost/search-keyword/?keyword=${keyword}`,
				method: 'GET',
			}),
			invalidatesTags: ['Kos'],
		}),
	}),
})

export const {
	useSearchKeywordMutation
} = kosApi

export default kosApi