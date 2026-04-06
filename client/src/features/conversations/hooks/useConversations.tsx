import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createConversationRequest,
  createGroupConversationRequest,
  deleteConversationRequest,
  getConversationsRequest,
} from "../api/conversations.api";

export const useConversations = () => {
  const queryClient = useQueryClient();

  const conversationsQuery = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await getConversationsRequest();
      return response.data.conversations;
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  const startConversationMutation = useMutation({
    mutationFn: (receiverId: string) => createConversationRequest(receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
  const createGroupMutation = useMutation({
    mutationFn: (data: { receiverIds: string[]; title: string }) =>
      createGroupConversationRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: (id: string) => deleteConversationRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  return {
    conversations: conversationsQuery.data ?? [],
    isLoadingConversations: conversationsQuery.isLoading,
    isErrorConversations: conversationsQuery.isError,
    startConversation: startConversationMutation.mutateAsync,
    isStartingConversation: startConversationMutation.isPending,
    createGroupConversation: createGroupMutation.mutateAsync,
    isCreatingGroupConversation: createGroupMutation.isPending,
    deleteConversation: deleteConversationMutation.mutateAsync,
  };
};
