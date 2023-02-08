import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const kosApi = createApi({
  reducerPath: "kosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://production-service.herokuapp.com/",
  }),
  tagTypes: ["Kos"],
  endpoints: (build) => ({
    listKos: build.mutation({
      query: ({token, page, size, enabled}) => ({
        url: `api/admin/kost/list?page=${page}&size=${size}&enabled=${enabled}`,
        method: "GET",  
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Kos"],
    }),
    rejectKos: build.mutation({
        query: ({ token, id }) => ({
          url: `api/admin/kost/reject/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Kos"],
      }),
      approveKos: build.mutation({
        query: ({ token, id }) => ({
          url: `api/admin/kost/approve/${id}`,
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Kos"],
      }),
      deleteKos: build.mutation({
      query: ({ token, id }) => ({
        url: `api/admin/kost/delete/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Kos"],
    }),
    detilKos: build.mutation({
      query: ({ token, id }) => ({
        url: `api/admin/kost/get/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Kos"],
    }),
  }),
});

export const {
    useListKosMutation,
    useRejectKosMutation,
    useApproveKosMutation,
    useDeleteKosMutation,
    useDetilKosMutation
} = kosApi;

export default kosApi;
