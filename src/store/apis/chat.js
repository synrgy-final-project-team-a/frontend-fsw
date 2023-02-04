import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090",
  }),
  tagTypes: ["Chats"],
  endpoints: (build) => ({
    addRoomChat: build.mutation({
      query: ({ token, body }) => ({
        url: `/api/chat`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),
    getListRoomChat: build.mutation({
      query: ({ token }) => ({
        url: `/api/chat/load-room`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getHistoryChat: build.mutation({
      query: ({ token, body }) => ({
        url: `/api/chat/load-chat`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },

        body: body,
      }),
    }),
  }),
});

export const {
  useAddRoomChatMutation,
  useGetListRoomChatMutation,
  useGetHistoryChatMutation,
} = chatApi;

export default chatApi;
