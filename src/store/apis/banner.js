import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bannerApi = createApi({
	reducerPath: "bannerApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://authentication-service-production.up.railway.app/",
	}),
	tagTypes: ["Banner"],
	endpoints: (build) => ({
		listBanner: build.mutation({
			query: () => ({
				url: `api/admin/banner/list`,
				method: "GET",
			}),
			invalidatesTags: ["Banner"],
		}),
		addBanner: build.mutation({
			query: (body) => ({
				url: `api/admin/banner`,
				method: "POST",
				body: body
			}),
			invalidatesTags: ["Banner"],
		}),
		deleteBanner: build.mutation({
			query: (id) => ({
				url: `api/admin/banner/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Banner"],
		}),
	}),
});

export const {
	useListBannerMutation,
	useAddBannerMutation,
	useDeleteBannerMutation
} = bannerApi;

export default bannerApi;
