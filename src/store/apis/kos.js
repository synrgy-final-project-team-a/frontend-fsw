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
		getList: build.mutation({
			query: (params) => ({
				url: `api/kost/filter/sort/`,
				method: 'GET',
				params: params
			}),
			invalidatesTags: ['Kos'],
		}),
		pencariGetOne: build.mutation({
			query: (id) => ({
				url: `api/kost/get/${id}`,
				method: 'GET',
			}),
			invalidatesTags: ['Kos'],
		}),
	}),
})

export const {
	useSearchKeywordMutation,
	useGetListMutation,
	usePencariGetOneMutation
} = kosApi

export default kosApi