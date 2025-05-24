import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //filter
  const filterVal = searchParams.get("status");
  const filter =
    !filterVal || filterVal === "all"
      ? null
      : { field: "status", value: filterVal, method: "eq" };

  //sort
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const sort = { field: field, direction: direction };
  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    status,

    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy: sort, page }),
  });
  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy: sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy: sort, page: page - 1 }),
    });

  return { isLoading: status === "pending", error, bookings, count };
}
