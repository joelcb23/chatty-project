import api from "../../../api/axios.api";

export const getConversationsRequest = async () =>
  await api.get(`/conversations`);

export const createConversationRequest = async (receiverId: string) =>
  await api.post(`/conversations`, { receiverId });

export const createGroupConversationRequest = async (data: {
  receiverIds: string[];
  title: string;
}) => await api.post(`/conversations/group`, data);

export const deleteConversationRequest = async (conversationId: string) =>
  await api.delete(`/conversations/${conversationId}`);
