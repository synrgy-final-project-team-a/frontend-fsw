import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const transaksiApi = createApi({
	reducerPath: "transaksiApi",
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://transaction-service.herokuapp.com/'
	}),
	tagTypes: ['Transaksi'],
	endpoints: (build) => ({
		addBookingByPencari: build.mutation({
			query: ({ body, profileId, priceId }) => ({
				url: `api/seeker/transactions/user/${profileId}/price/${priceId}`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Transaksi'],
		}),
		addBuktiByPencari: build.mutation({
			query: ({ body, transactionId }) => ({
				url: `api/seeker/transactions/transaction/${transactionId}`,
				method: 'PUT',
				body: body,
			}),
			invalidatesTags: ['Transaksi'],
		}),
		getListbyPencari: build.mutation({
			query: ({ profileId }) => ({
				url: `api/seeker/transactions/list/${profileId}`,
				method: 'GET',
			}),
			invalidatesTags: ['Transaksi'],
		}),
	}),
})

export const {
	useAddBookingByPencariMutation,
	useAddBuktiByPencariMutation,
	useGetListbyPencariMutation
} = transaksiApi

export default transaksiApi