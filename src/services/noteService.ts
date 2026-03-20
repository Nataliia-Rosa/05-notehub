import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<FetchNotesResponse> = await instance.get("", {
    params,
  });
  return res.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const res: AxiosResponse<Note> = await instance.post("", payload);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/${id}`);
};
