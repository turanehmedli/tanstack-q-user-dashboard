import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../utils/types";

// Fetch all users from API
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  console.log(response)
  const data = await response.json();

  return data.users.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    image: user.image,
    age: user.age || 25,
    gender: user.gender || "Male",
    address: {
      country: user.address?.country || "Unknown",
    },
    company: {
      name: user.company?.name || "Unknown",
    },
    role: (["Admin", "Editor", "Viewer"] as const)[
      Math.floor(Math.random() * 3)
    ],
    status: Math.random() > 0.2 ? ("Active" as const) : ("Inactive" as const),
  }));
};

// Hook to fetch all users
export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      // Mock API call - returns 200 status
      const response = await fetch(
        `https://dummyjson.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      // Mock API call - returns 200 status
      const response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
