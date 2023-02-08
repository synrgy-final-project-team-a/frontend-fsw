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
		getListByPenyewa: build.mutation({
			query: ({ idProfile, page, size }) => ({
				url: `api/tennant/kost/list/${idProfile}?page=${page}&size=${size}`,
				method: 'GET'
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
	}),
})

export const {
	useSearchKeywordMutation,
	useGetListByPenyewaMutation,
	useGetListMutation
} = kosApi

export default kosApi