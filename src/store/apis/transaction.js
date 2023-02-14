import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://transaction-service.herokuapp.com//",
  }),
  tagTypes: ["Transaction"],
  endpoints: (build) => ({
    transactionList: build.mutation({
      query: ({token, id}) => ({
        url: `api/tennant/transactions/list/${id}?page=0&size=10`,
        method: "GET",  
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    transactionDetail: build.mutation({
      query: ({token, id}) => ({
        url: `api/admin/transactions/${id}`,
        method: "GET",  
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    confirmTransaction: build.mutation({
      query: ({token, id}) => ({
        url: `api/tennant/transactions/confirm/${id}`,
        method: "POST",  
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    rejectTransaction: build.mutation({
      query: ({ token, id }) => ({
        url: `api/tennant/transactions/reject/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    approveTransaction: build.mutation({
      query: ({token, id}) => ({
        url: `api/tennant/transactions/approve/${id}`,
        method: "POST",  
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
    useTransactionListMutation,
    useTransactionDetailMutation,
    useConfirmTransactionMutation,
    useRejectTransactionMutation,
    useApproveTransactionMutation
} = transactionApi;

export default transactionApi;


